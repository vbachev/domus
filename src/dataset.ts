import { SpreadsheetData, getCachedData, fetchAllData, insertRow } from './store/googleSheets'
import { Content, Transaction, Account, Entity, Note } from './types'

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

	const notesByKey = data.notes.map(n => new Note(n))
		.reduce((all: any, n) => {
			all[n.about] = all[n.about] || [];
			all[n.about].push(n)
			return all
		}, {})
	const transactions = data.transactions.map(t => new Transaction(t))
		.sort((a, b) => b.date.getTime() - a.date.getTime())
	const accounts = groupTransactionsByKey(transactions, 'account')
		.map(t => new Account(t))
	const entities = groupTransactionsByKey(transactions, 'entity')
		.map(t => new Entity(t))
		.map(e => e.setNotes(notesByKey[e.name]))
		.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
	return { transactions, accounts, entities, insert: () => { } }
}

export const initialContent: Content = parseSpreadsheet(getCachedData())

export const fetchContent = () => fetchAllData().then(parseSpreadsheet)

export const insertContent = (newContent: Note) => {
	return insertRow('notes', newContent.toRawRecord()).then(parseSpreadsheet)
}
