import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { name as appName } from '../package.json'
import { DatasetContext, loadDataset, defaultDataset } from './dataset'
import Navigation from './Navigation'
import HomePage from './HomePage'
import EntitiesPage from './EntitiesPage'
import EntityPage from './EntityPage'

export default function App() {
	const [dataset, setDataset] = React.useState(defaultDataset)
	React.useEffect(() => {
		loadDataset().then(setDataset)
	}, [])

	return (
		<BrowserRouter basename={appName}>
			<DatasetContext.Provider value={dataset}>
				<Navigation />
				<div className='container py-3'>
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route exact path='/entities' component={EntitiesPage} />
						<Route exact path='/entity/:name' component={EntityPage} />
					</Switch>
				</div>
			</DatasetContext.Provider>
		</BrowserRouter>
	);
}
