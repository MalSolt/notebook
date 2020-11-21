import React, { useState } from 'react'
import './Note.scss'
import Arrow from '../../../img/arrow.svg'
import Edit from '../../../img/edit.svg'
import { useDispatch } from 'react-redux'
import { toggleDone } from '../../../redux/reducer'
import { Dropdown } from './Dropdown'
import { TitleEditMode } from './TitleEditMode'

export const Note = ({ changeNoteHandler, moveNoteHandler, allPages, pageName, noteId, title, done, removeNoteHandler }) => {
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)
  const [titleEditMode, setTitleEditMode] = useState(false)
  return (
    <li className='list-group-item'>
      {titleEditMode ? (
        <TitleEditMode
          changeNoteHandler={changeNoteHandler}
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
                moveNoteHandler={moveNoteHandler}
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
