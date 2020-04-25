import GSAPI from 'google-sheets-api'

interface GoogleSheetsAPI {
	insert: Function
	getAll: Function
	user: {
		signIn: Function
	}
}

export interface SpreadsheetData {
	[key: string]: string[][]
	transactions: string[][]
	notes: string[][]
}

const blankSpreadsheet: SpreadsheetData = {
	transactions: [],
	notes: []
}

const sheetNames: any = {
	transactions: 'Движения',
	notes: 'Бележки'
}

const cache = window.localStorage
const cacheKey = 'spreadsheet-data'

const storeInCache = (data: SpreadsheetData) => {
	cache.setItem(cacheKey, JSON.stringify(data))
}

const readFromCache = (): SpreadsheetData => {
	const serializedData = cache.getItem(cacheKey)
	return serializedData ? JSON.parse(serializedData) : blankSpreadsheet
}

const promisify = (fn: Function) => (...args: any) => new Promise(resolve => fn(...args, resolve))

let _api: GoogleSheetsAPI
const getAPI = (): Promise<GoogleSheetsAPI> => new Promise(resolve => {
	if (_api) return resolve(_api)
	const newAPI = GSAPI({
		clientId: '780267795399-048pa12qtdcpdganklc6ggmpbm3epucv.apps.googleusercontent.com',
		spreadsheet: { name: 'База данни ЕС', sheets: Object.values(sheetNames) }
	}, () => {
		_api = newAPI
		_api.insert = promisify(_api.insert)
		_api.getAll = promisify(_api.getAll)
		_api.user.signIn = promisify(_api.user.signIn)
		resolve(_api)
	})
})

export const getCachedData = () => readFromCache()

export const fetchAllData = async () => {
	const api = await getAPI()

	const isSignedIn = await api.user.signIn()
	if (!isSignedIn) return blankSpreadsheet

	const resultList = await Promise.all(Object.values(sheetNames).map(s => api.getAll(s)))
	const rows = Object.keys(sheetNames)
		.reduce((acc, key, index) => ({ ...acc, [key]: resultList[index] }), {}) as SpreadsheetData
	storeInCache(rows)
	return rows
}

export const insertRow = async (sheet: string, data: string[]) => {
	getAPI().then(api => api.insert(sheetNames[sheet], data))
	const rows = readFromCache()
	rows[sheet].push(data)
	storeInCache(rows)
	return rows
}
