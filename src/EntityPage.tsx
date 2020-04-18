import React from 'react'
import { DatasetContext } from './dataset'

export default function EntityPage(props: any) {
	const { entities } = React.useContext(DatasetContext)
	const { name } = props.match.params;
	const entity = entities.find(e => e.name === name);
	const views = ['Движения', 'Хора'];
	const [activeView, setActiveView] = React.useState(views[0]);
	const changeView = (e: any) => {
		e.preventDefault();
		setActiveView(e.target.innerText);
	};

	if (!entity) return <h2>Not found</h2>;

	return (
		<div>
			<h2>{name}</h2>

			<ul className='nav nav-tabs mb-3'>
				{views.map(v => (
					<li key={v} className='nav-item'>
						<a className={`nav-link ${activeView === v ? 'active' : ''}`}
							onClick={changeView}>
							{v}
						</a>
					</li>
				))}
			</ul>

			{activeView === views[1] && (
				<div className='list-group mb-4'>
					{entity.people.map(person => (
						<div key={person} className='list-group-item list-group-item-action'>
							{person}
						</div>
					))}
				</div>
			)}

			{activeView === views[0] && (
				<div className='row'>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th>Дата</th>
								<th>Сума</th>
								<th>Описание</th>
							</tr>
						</thead>
						<tbody>
							{entity.transactions.map(t => (
								<tr key={t.date + t.comment}>
									<td>{t.getFormattedDate()}</td>
									<td>{t.amount}лв</td>
									<td>{t.comment}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}
