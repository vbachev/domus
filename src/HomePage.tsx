import React from 'react'
import { DatasetContext } from './dataset'

export default function HomePage() {
	const { accounts } = React.useContext(DatasetContext)

	return (
		<div>
			<div className="mt-n3 mx-n3 p-3 bg-secondary text-light">
				<h2>Баланси и сметки</h2>
			</div>

			<ul className='list-group mt-3'>
				<li className='list-group-item list-group-item-action active'>
					Общо: {accounts.reduce((total, account) => total + account.amount, 0)}лв
				</li>
				{accounts.map(({ name, amount }) => (
					<li key={name} className='list-group-item list-group-item-action'>
						{name}: {amount.toFixed(2)}лв
					</li>
				))}
			</ul>
		</div>
	);
}
