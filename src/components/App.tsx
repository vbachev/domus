import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import { name as appName } from '../../package.json'
import Navigation from './Navigation'
import HomePage from './HomePage'
import EntitiesPage from './EntitiesPage'
import EntityPage from './EntityPage'
import ScrollToTop from './ScrollToTop'
import StoreProvider from './StoreProvider'

const searchParams = new URLSearchParams(window.location.search)
const redirectTo = searchParams.get('redirectTo')

export default function App() {
	return (
		<BrowserRouter basename={appName}>
			{redirectTo
				? (
					<Redirect to={redirectTo.split(appName).pop() as string} />
				)
				: (
					<StoreProvider>
						<ScrollToTop />
						<Navigation />
						<div className='container py-3'>
							<Switch>
								<Route exact path='/' component={HomePage} />
								<Route exact path='/entities' component={EntitiesPage} />
								<Route exact path='/entity/:name' component={EntityPage} />
							</Switch>
						</div>
					</StoreProvider>
				)}
		</BrowserRouter>
	);
}
