export class Transaction {
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

export class Entity {
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

export class Account {
	name: string
	transactions: Transaction[]
	amount: number

	constructor(transactions: Transaction[]) {
		this.name = transactions[0].account;
		this.transactions = transactions;
		this.amount = transactions.reduce((sum, t) => sum + t.amount, 0);
	}
}

export class Note {
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

	static fromMessage(about: string, message: string) {
		const now = new Date()
		const dateString = [
			now.getDate(),
			now.getMonth() + 1, // months are 0-based
			now.getFullYear()
		].map(i => i.toString().padStart(2, '0')).join('.');
		return new Note([dateString, about, message])
	}

	toRawRecord() {
		const dateString = [
			this.date.getDate(),
			this.date.getMonth() + 1, // months are 0-based
			this.date.getFullYear()
		].map(i => i.toString().padStart(2, '0')).join('.');
		return [dateString, this.about, this.message]
	}
}
