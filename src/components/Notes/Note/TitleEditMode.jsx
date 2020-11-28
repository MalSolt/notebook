import React from 'react'
import { useDispatch } from 'react-redux'
import { changeNote } from '../../../redux/reducer'
import './Note.scss'

export const TitleEditMode = ({ setTitleEditMode, pageName, noteId, title, setAlertContent, restartAlertsetTimeout }) => {
  const dispatch = useDispatch()
  const changeNoteHandler = (e, pageName, noteId) => {
    const noteTitle = e.target.value.trim()
    restartAlertsetTimeout()
    if (e.target.value.trim()) {
      dispatch(changeNote({ noteTitle, pageName, noteId }))
      setAlertContent({ type: 'success', title: 'Note changed' })
    } else {
      setAlertContent({ type: 'warning', title: 'Enter note title' })
    }
  }
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
