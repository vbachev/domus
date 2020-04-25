import React from 'react'
import { useStore } from './StoreProvider'
import NotesList from './NotesList'

export default function EntityPage(props: any) {
	const { entities } = useStore()
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
			<div className="mt-n3 mx-n3 mb-3 px-3 pt-3 bg-secondary text-light">
				<h2>{name}</h2>
				<ul className='nav nav-tabs border-0'>
					{views.map(v => (
						<li key={v} className='nav-item'>
							<a className={`nav-link ${activeView === v ? 'active' : ''}`}
								onClick={changeView}>
								{v}
							</a>
						</li>
					))}
				</ul>
			</div>

			<NotesList about={name} />

			{activeView === views[1] && (
				<div className='list-group'>
					{entity.people.map(person => (
						<div key={person} className='list-group-item list-group-item-action'>
							{person}
						</div>
					))}
				</div>
			)}

			{activeView === views[0] && (
				<div className='list-group'>
					{entity.transactions.map(t => (
						<div key={t.date + t.comment + t.amount} className='list-group-item'>
							<small className='d-flex justify-content-between align-items-center'>
								<div>{t.formattedDate}</div>
								<div>{t.person}</div>
							</small>
							<span className='badge badge-secondary mr-2'>
								{t.amount}лв
								</span>
							{t.comment}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
