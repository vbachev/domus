import React from 'react'
import { Note } from '../types'
import { useStore } from './StoreProvider'

interface NotesListProps {
	notes: Note[],
	about: string
}

export default function NotesList(props: NotesListProps) {
	const { insert } = useStore()
	const [newMessage, setNewMessage] = React.useState('')
	const changeNewMessage = (e: any) => setNewMessage(e.target.value)
	const createNewNote = (e: any) => {
		e.preventDefault()
		insert(Note.fromMessage(props.about, newMessage))
		setNewMessage('')
	}

	return (
		<div className='list-group mb-3'>
			<form className='list-group-item list-group-item-warning' onSubmit={createNewNote} >
				<small className='mr-2'>{'New note: '}</small>
				<input value={newMessage} onChange={changeNewMessage} />
			</form>

			{props.notes.map(note => (
				<div key={note.date.getTime()} className='list-group-item list-group-item-warning'>
					<small className='mr-2'>{note.formattedDate}</small>
					{note.message}
				</div>
			))}
		</div>
	)
}
