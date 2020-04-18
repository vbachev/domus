import React from 'react'
import { DatasetContext } from './dataset'

export default function HomePage() {
	const { accounts } = React.useContext(DatasetContext)

	return (
		<div>
			<h2>Баланси</h2>

			<ul className='list-group'>
				{accounts.map(({ name, amount }) => (
					<li key={name} className='list-group-item  list-group-item-action'>
						{name}: {amount.toFixed(2)}лв
            </li>
				))}
			</ul>
		</div>
	);
}
