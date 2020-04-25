import React from 'react'
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
	const { pathname } = useLocation()
	const menuItems = [
		{ label: 'Баланси', href: '/' },
		{ label: 'Обекти', href: '/entities' }
	]
	return (
		<nav className='navbar navbar-expand sticky-top navbar-dark bg-dark'>
			<div className='container'>
				<span className="navbar-brand">
					<img src={process.env.PUBLIC_URL + '/apple-touch-icon.png'}
						width="30"
						height="30"
						alt="Domus logo" />
				</span>
				<div className='navbar-nav mr-auto'>
					{menuItems.map(m => (
						<Link key={m.href} to={m.href}
							className={`nav-item nav-link ${pathname === m.href ? 'active' : ''}`}>
							{m.label}
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}
