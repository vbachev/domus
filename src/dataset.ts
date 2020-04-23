import React from 'react'
import GSAPI from 'google-sheets-api'

class Transaction {
	[key: string]: any
	date: Date
	account: string
	amount: number
	person: string
	entity: string
	comment: string
	// @TODO: hash an id for use in loop keys

	constructor(row: string[]) {
		const [day, month, year] = row[0].split('.').map(Number);
		this.date = new Date(year, month - 1, day) // months are 0-based
		this.account = row[3]
		this.amount = Number(row[4])
		this.person = row[2]
		this.entity = row[1]
		this.comment = row[5]
	}

	// @TODO: simplify
	getFormattedDate(): string {
		return [
			this.date.getDate(),
			this.date.getMonth() + 1, // months are 0-based
			this.date.getFullYear()
		]
			.map(i => i.toString().padStart(2, '0'))
			.join('.');
	}
}

class Entity {
	name: string
	transactions: Transaction[]
	people: string[]
	notes: Note[]

	constructor(transactions: Transaction[]) {
		this.name = transactions[0].entity;
		this.transactions = transactions;
		this.people = Array.from(new Set(transactions.map(t => t.person)));
		this.notes = [] // @TODO: as second argument
	}

	getLastPerson(): string {
		return this.transactions[0].person;
	}

	getMonthsOverdue(): number {
		const lastTransaction = this.transactions[0];
		const now = new Date();
		const yearsAgo = now.getFullYear() - lastTransaction.date.getFullYear();
		const monthsAgo = now.getMonth() - lastTransaction.date.getMonth();
		return yearsAgo * 12 + monthsAgo;
	}

	// @TODO: as second constructor argument
	setNotes(notes: Note[]): Entity {
		if (notes) this.notes = notes
		return this
	}
}

class Account {
	name: string
	transactions: Transaction[]
	amount: number

	constructor(transactions: Transaction[]) {
		this.name = transactions[0].account;
		this.transactions = transactions;
		this.amount = transactions.reduce((sum, t) => sum + t.amount, 0);
	}
}

class Note {
	date: Date
	formattedDate: string
	about: string
	message: string

	constructor(note: string[]) {
		const [day, month, year] = note[0].split('.').map(Number);
		this.date = new Date(year, month - 1, day) // months are 0-based
		this.formattedDate = note[0]
		this.about = note[1]
		this.message = note[2]
	}
}

interface Dataset {
	transactions: Transaction[]
	accounts: Account[]
	entities: Entity[]
}

interface RawRecords {
	transactions: string[][]
	notes: string[][]
}

const promisify = (fn: Function) => (...args: any) => new Promise(resolve => fn(...args, resolve))

const fetchRawRecords = (): Promise<RawRecords> => new Promise(resolve => {
	const sheets = {
		transactions: 'Движения',
		notes: 'Бележки'
	}
	const gsapi = GSAPI({
		clientId: '780267795399-048pa12qtdcpdganklc6ggmpbm3epucv.apps.googleusercontent.com',
		spreadsheet: { name: 'База данни ЕС', sheets: Object.values(sheets) }
	}, () => {
		gsapi.user.signIn(() => {
			const getAll = promisify(gsapi.getAll)
			Promise.all(Object.values(sheets).map(s => getAll(s)))
				.then((dataArr) => {
					const result = Object.keys(sheets)
						.reduce((acc, key, index) => ({ ...acc, [key]: dataArr[index] }), {})
					resolve(result as RawRecords)
				})
		})
	})
})

function groupTransactionsByKey(transactions: Transaction[], key: string): Transaction[][] {
	const transactionsByKey = transactions.reduce((all: any, t) => {
		const keyValue = t[key];
		all[keyValue] = all[keyValue] || [];
		all[keyValue].push(t);
		return all;
	}, {})
	return Object.values(transactionsByKey)
}

function parseRawRecords(rawRecords: RawRecords): Dataset {
	// skip header rows
	rawRecords.transactions.shift()
	rawRecords.notes.shift()

	const notesByKey = rawRecords.notes.map(n => new Note(n))
		.reduce((all: any, n) => {
			all[n.about] = all[n.about] || [];
			all[n.about].push(n)
			return all
		}, {})
	const transactions = rawRecords.transactions.map(t => new Transaction(t))
		.sort((a, b) => b.date.getTime() - a.date.getTime())
	const accounts = groupTransactionsByKey(transactions, 'account')
		.map(t => new Account(t))
	const entities = groupTransactionsByKey(transactions, 'entity')
		.map(t => new Entity(t))
		.map(e => e.setNotes(notesByKey[e.name]))
		.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
	return { transactions, accounts, entities }
}

const cachedRawRecords = window.localStorage.getItem('rawRecords')

export const defaultDataset: Dataset = cachedRawRecords
	? parseRawRecords(JSON.parse(cachedRawRecords))
	: { transactions: [], accounts: [], entities: [] }

export const DatasetContext = React.createContext(defaultDataset)

export const loadDataset = async () => {
	const rawRecords = await fetchRawRecords()
	if (!rawRecords.transactions) {
		console.error('Could not fetch any transactions!')
		return defaultDataset
	}
	window.localStorage.setItem('rawRecords', JSON.stringify(rawRecords))
	return parseRawRecords(rawRecords)
}
