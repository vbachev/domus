import React from 'react'
import { DatasetContext } from './dataset'
import { Link } from 'react-router-dom'

export default function EntitiesPage() {
	const { entities } = React.useContext(DatasetContext)
	const views = ['Азбучно', 'Длъжници'];
	const [activeView, setActiveView] = React.useState(views[0]);
	const changeView = (e: any) => {
		e.preventDefault();
		setActiveView(e.target.innerText);
	};

	const sortedEntities = activeView === views[0]
		? entities
		: [...entities].sort((a, b) => b.getMonthsOverdue() - a.getMonthsOverdue())

	return (
		<div>
			<div className="mt-n3 mx-n3 mb-3 px-3 pt-3 bg-secondary text-light">
				<h2>Обекти</h2>
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

			<div className='list-group'>
				{sortedEntities.map(e => (
					<Link key={e.name} to={`/entity/${e.name}`} className='list-group-item list-group-item-action'>
						<div className='d-flex justify-content-between align-items-center'>
							<h5 className='mb-0'>{e.name}</h5>
							<span className='badge badge-warning badge-pill'>
								{e.getMonthsOverdue()} месеца
                </span>
						</div>
						<small className='text-muted'>
							{e.getLastPerson()}
						</small>

					</Link>
				))}
			</div>
		</div>
	);
}
