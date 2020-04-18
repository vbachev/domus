import React from 'react'
import { Link, useLocation } from "react-router-dom";

export default function Header() {
	const { pathname } = useLocation()
	const menuItems = [
		{ label: 'Баланси', href: '/' },
		{ label: 'Обекти', href: '/entities' }
	]
	return (
		<nav className='navbar navbar-expand sticky-top navbar-dark bg-dark'>
			<div className='container'>
				<div className='navbar-nav mr-auto'>
					{menuItems.map(m => (
						<Link to={m.href}
							className={`nav-item nav-link ${pathname === m.href ? 'active' : ''}`}>
							{m.label}
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}
