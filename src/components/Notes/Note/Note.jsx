import React, { useState } from 'react'
import './Note.scss'
import Arrow from '../../../img/arrow.svg'
import Edit from '../../../img/edit.svg'
import { useDispatch } from 'react-redux'
import { removeNote, toggleDone } from '../../../redux/reducer'
import { Dropdown } from './Dropdown'
import { TitleEditMode } from './TitleEditMode'

export const Note = ({ setAlertContent, allPages, pageName, noteId, title, done, restartAlertsetTimeout }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [titleEditMode, setTitleEditMode] = useState(false)
  const dispatch = useDispatch()

  const removeNoteHandler = (pageName, noteId) => {
    restartAlertsetTimeout()
    dispatch(removeNote({ pageName, noteId }))
    setAlertContent({ type: 'danger', title: 'Note deleted' })
  }

  return (
    <li className='list-group-item'>
      {titleEditMode ? (
        <TitleEditMode
          setAlertContent={setAlertContent}
          restartAlertsetTimeout={restartAlertsetTimeout}
          setTitleEditMode={setTitleEditMode}
          pageName={pageName}
          noteId={noteId}
          title={title}
        />
      ) : (
        <>
          <div className='note-content'>
            <input type='checkbox' readOnly checked={done} onClick={() => dispatch(toggleDone({ pageName, noteId }))} />
            &nbsp;&nbsp;
            <span>{title}</span>
            &nbsp;
            <img onClick={() => setTitleEditMode(!titleEditMode)} className='edit' src={Edit} alt='' />
          </div>
          <div className='buttons'>
            <button onClick={e => removeNoteHandler(pageName, noteId)} className='btn btn-outline-danger btn-sm'>
              &times;
            </button>
            <button onClick={() => setShowDropdown(!showDropdown)} className='btn btn-primary btn-sm dropdownToggle'>
              <img src={Arrow} alt=':' />
              <Dropdown
                setAlertContent={setAlertContent}
                restartAlertsetTimeout={restartAlertsetTimeout}
                showDropdown={showDropdown}
                allPages={allPages}
                pageName={pageName}
                noteId={noteId}
              />
            </button>
          </div>
        </>
      )}
    </li>
  )
}
