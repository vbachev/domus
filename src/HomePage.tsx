import React from 'react'
import { DatasetContext } from './dataset'

export default function HomePage() {
	const { accounts } = React.useContext(DatasetContext)
	const total = accounts.reduce((total, account) => total + account.amount, 0)

	return (
		<div>
			<div className="mt-n3 mx-n3 mb-3 p-3 bg-secondary text-light">
				<h2>Баланси и сметки</h2>
			</div>

			<ul className='list-group'>
				<li className='list-group-item list-group-item-secondary d-flex justify-content-between'>
					Общ баланс
					<strong>{total.toFixed(2)}лв</strong>
				</li>
				{accounts.map(({ name, amount }) => (
					<li key={name} className='list-group-item d-flex justify-content-between'>
						{name}
						<strong>{amount.toFixed(2)}лв</strong>
					</li>
				))}
			</ul>
		</div>
	);
}
