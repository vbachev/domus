import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { DatasetContext, loadDataset, defaultDataset } from './dataset'
import Header from './Header'
import HomePage from './HomePage'
import EntitiesPage from './EntitiesPage'
import EntityPage from './EntityPage'

export default function App() {
	const [dataset, setDataset] = React.useState(defaultDataset)
	React.useEffect(() => {
		loadDataset().then(setDataset)
	}, [])

	return (
		<BrowserRouter>
			<DatasetContext.Provider value={dataset}>
				<Header />
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
