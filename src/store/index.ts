import { SpreadsheetData, getCachedData, fetchAllData, insertRow } from './googleSheets'

class Transaction {
	[key: string]: any
	date: Date
	formattedDate: string
	account: string
	amount: number
	person: string
	entity: string
	comment: string
	// @TODO: hash an id for use in loop keys

	constructor(row: string[]) {
		const [day, month, year] = row[0].split('.').map(Number);
		this.date = new Date(year, month - 1, day) // months are 0-based
		this.formattedDate = row[0]
		this.account = row[3]
		this.amount = Number(row[4])
		this.person = row[2]
		this.entity = row[1]
		this.comment = row[5]
	}
}

class Entity {
	name: string
	transactions: Transaction[]
	people: string[]

	constructor(transactions: Transaction[]) {
		this.name = transactions[0].entity;
		this.transactions = transactions;
		this.people = Array.from(new Set(transactions.map(t => t.person)));
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

interface Content {
	transactions: Transaction[]
	accounts: Account[]
	entities: Entity[]
	notes: Note[]
	insert: Function
}

function groupTransactionsByKey(transactions: Transaction[], key: string): Transaction[][] {
	const transactionsByKey = transactions.reduce((all: any, t) => {
		const keyValue = t[key];
		all[keyValue] = all[keyValue] || [];
		all[keyValue].push(t);
		return all;
	}, {})
	return Object.values(transactionsByKey)
}

function parseSpreadsheet(data: SpreadsheetData): Content {
	// skip header rows
	data.transactions.shift()
	data.notes.shift()

	const transactions = data.transactions.map(t => new Transaction(t))
		.sort((a, b) => b.date.getTime() - a.date.getTime())

	const accounts = groupTransactionsByKey(transactions, 'account')
		.map(t => new Account(t))

	const entities = groupTransactionsByKey(transactions, 'entity')
		.map(t => new Entity(t))
		.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

	const notes = data.notes.map(n => new Note(n))

	return { transactions, accounts, entities, notes, insert: () => { } }
}

export const initialContent: Content = parseSpreadsheet(getCachedData())

export const fetchContent = () => fetchAllData().then(parseSpreadsheet)

export const insertContent = (newContent: string[]) => {
	const now = new Date()
	const dateString = [
		now.getMonth() + 1, // months are 0-based
		now.getDate(),
		now.getFullYear()
	].join('/');
	newContent.unshift(dateString)
	// @TODO: need to insert m/d/yyyy in google and dd.mm.yyyy in localstorage :(
	return insertRow('notes', newContent).then(parseSpreadsheet)
}
