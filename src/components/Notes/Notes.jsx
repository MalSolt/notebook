import React from 'react'
import { NavLink } from 'react-router-dom'
import { Note } from './Note/Note'
import Arrow from '../../img/arrow.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addNote } from '../../redux/reducer'

export const Notes = ({ restartAlertsetTimeout, changeNoteHandler, setAlertContent, allPages, page }) => {
  const state = useSelector(state => state.state)
  const dispatch = useDispatch()

  const addNoteHandler = (e, pageName) => {
    const noteTitle = e.target.value.trim()
    if (e.key === 'Enter') {
      restartAlertsetTimeout()
      if (e.target.value.trim()) {
        dispatch(addNote({ noteTitle, pageName }))
        e.target.value = ''
        setAlertContent({ type: 'success', title: 'Note added' })
      } else {
        setAlertContent({ type: 'warning', title: 'Enter note title' })
      }
    }
  }

  return (
    <div className='notes'>
      <div className='page-heiding'>
        <NavLink to='/pages'>
          <img className='come-back' src={Arrow} alt='come back' />
        </NavLink>
        <h2 className='text-right'>{page}</h2>
      </div>
      <input type='text' placeholder='Enter a note' className='form-control' onKeyDown={e => addNoteHandler(e, page)} />
      <hr></hr>
      <ul className='list-group'>
        {state[page].length ? (
          state[page].map(note => {
            return (
              <Note
                restartAlertsetTimeout={restartAlertsetTimeout}
                setAlertContent={setAlertContent}
                changeNoteHandler={changeNoteHandler}
                allPages={allPages}
                pageName={page}
                key={note.id}
                noteId={note.id}
                title={note.title}
                done={note.done}
              />
            )
          })
        ) : (
          <h2 className='text-center'>Page is empty...</h2>
        )}
      </ul>
    </div>
  )
}
