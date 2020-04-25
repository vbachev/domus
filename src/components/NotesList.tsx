import React from 'react'
import { useStore } from './StoreProvider'

interface NotesListProps {
	about: string
}

export default function NotesList(props: NotesListProps) {
	const { notes, insert } = useStore()
	const filteredNotes = notes.filter(n => n.about === props.about)

	const [newMessage, setNewMessage] = React.useState('')
	const changeNewMessage = (e: any) => setNewMessage(e.target.value)
	const createNewNote = (e: any) => {
		e.preventDefault()
		insert([props.about, newMessage])
		setNewMessage('')
	}

	return (
		<div className='list-group mb-3'>
			<form className='list-group-item list-group-item-warning' onSubmit={createNewNote} >
				<small className='mr-2'>{'Бележки: '}</small>
				<input value={newMessage} onChange={changeNewMessage} />
			</form>

			{filteredNotes.map(note => (
				<div key={note.date.getTime()} className='list-group-item list-group-item-warning'>
					<small className='mr-2'>{note.formattedDate}</small>
					{note.message}
				</div>
			))}
		</div>
	)
}
