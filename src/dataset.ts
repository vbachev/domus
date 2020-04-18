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

	constructor(row: string[]) {
		const dateParts = row[0].split('.').map(s => Number(s));
		this.date = new Date(dateParts[2], dateParts[1], dateParts[0])
		this.account = String(row[3])
		this.amount = Number(row[4])
		this.person = String(row[2])
		this.entity = String(row[1])
		this.comment = String(row[5])
	}

	getFormattedDate(): string {
		return [
			this.date.getDate(),
			this.date.getMonth() + 1,
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

	constructor(transactions: Transaction[]) {
		this.name = transactions[0].entity;
		this.transactions = transactions;
		this.people = Array.from(new Set(transactions.map(t => t.person)));
	}

	getLastPerson(): string {
		return this.transactions[this.transactions.length - 1].person;
	}

	getMonthsOverdue(): number {
		const lastTransaction = this.transactions[this.transactions.length - 1];
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

const getTransactions = (): Promise<string[][]> => new Promise(resolve => {
	const gsapi = GSAPI({
		clientId: '780267795399-048pa12qtdcpdganklc6ggmpbm3epucv.apps.googleusercontent.com',
		spreadsheet: { name: 'База данни ЕС', sheets: ['Движения'] }
	}, () => {
		gsapi.user.signIn(() => {
			gsapi.getAll('Движения', resolve)
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

export const defaultDataset = {
	transactions: [] as Transaction[],
	accounts: [] as Account[],
	entities: [] as Entity[]
}

export const DatasetContext = React.createContext(defaultDataset)

export const loadDataset = async () => {
	const rawTransactions: string[][] = await getTransactions()
	if (!rawTransactions) {
		console.error('Could not fetch any transactions!')
		return defaultDataset
	}
	rawTransactions.shift() // skip header row
	const transactions = rawTransactions.map(t => new Transaction(t));
	const accounts = groupTransactionsByKey(transactions, 'account').map(t => new Account(t))
	const entities = groupTransactionsByKey(transactions, 'entity').map(t => new Entity(t))
	entities.sort((a, b) => {
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	})
	return { transactions, accounts, entities }
}
