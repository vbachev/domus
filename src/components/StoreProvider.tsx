import React from 'react'
import { initialContent, fetchContent, insertContent } from '../store'

const ContentContext = React.createContext(initialContent)

export function useStore() {
	return React.useContext(ContentContext)
}

interface StoreProviderProps {
	children: React.ReactElement[]
}

export default function StoreProvider(props: StoreProviderProps) {
	const [state, setState] = React.useState(initialContent)
	React.useEffect(() => {
		fetchContent().then(setState)
	}, [])
	const insert = (data: any) => {
		insertContent(data).then(setState)
	}

	return (
		<ContentContext.Provider value={{ ...state, insert }}>
			{props.children}
		</ContentContext.Provider>
	)
}
