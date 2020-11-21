import React from 'react'
import './Note.scss'

export const TitleEditMode = ({ changeNoteHandler, setTitleEditMode, pageName, noteId, title }) => {
  return (
    <input
      onKeyDown={e => {
        if (e.key === 'Enter') {
          changeNoteHandler(e, pageName, noteId)
          setTitleEditMode(false)
        }
      }}
      autoFocus
      className='form-control'
      defaultValue={title}
      onBlur={() => setTitleEditMode(false)}
    />
  )
}
