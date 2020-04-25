import GSAPI from 'google-sheets-api'
import { RawRecords, Content, Transaction, Account, Entity, Note } from './types'

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

function parseRawRecords(rawRecords: RawRecords): Content {
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
	return { transactions, accounts, entities, insert: () => { } }
}

const cachedRawRecords = window.localStorage.getItem('rawRecords')

export const initialContent: Content = parseRawRecords(cachedRawRecords
	? JSON.parse(cachedRawRecords)
	: { transactions: [], notes: [] }
)

export const fetchContent = async () => {
	const rawRecords = await fetchRawRecords()
	if (!rawRecords.transactions) {
		console.error('Could not fetch any transactions!')
		return initialContent
	}
	window.localStorage.setItem('rawRecords', JSON.stringify(rawRecords))
	return parseRawRecords(rawRecords)
}

export const insertContent = async (newContent: Note) => {
	const cachedRawRecords = window.localStorage.getItem('rawRecords')
	const rawRecords = cachedRawRecords
		? JSON.parse(cachedRawRecords)
		: { transactions: [], notes: [] }
	rawRecords.notes.push(newContent.toRawRecord())
	window.localStorage.setItem('rawRecords', JSON.stringify(rawRecords))
	return parseRawRecords(rawRecords)
}
