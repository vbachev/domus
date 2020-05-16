import React from 'react'
import { useHistory } from 'react-router-dom';

interface RedirectOnLoadProps {
	basename: string
}

export default function RedirectOnLoad(props: RedirectOnLoadProps) {
	const { location, replace } = useHistory();
	const searchParams = new URLSearchParams(location.search)
	const redirectTo = searchParams.get('redirectTo')

	if (redirectTo) {
		replace(redirectTo.split(props.basename).pop() as string)
	}

	return null
}
