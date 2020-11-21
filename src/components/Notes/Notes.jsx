import React from 'react'
import { NavLink } from 'react-router-dom'
import { Note } from './Note/Note'
import Arrow from '../../img/arrow.svg'

export const Notes = ({ changeNoteHandler, state, moveNoteHandler, addNoteHandler, allPages, page, removeNoteHandler }) => {
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
                changeNoteHandler={changeNoteHandler}
                moveNoteHandler={moveNoteHandler}
                allPages={allPages}
                pageName={page}
                key={note.id}
                noteId={note.id}
                title={note.title}
                done={note.done}
                removeNoteHandler={removeNoteHandler}
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
