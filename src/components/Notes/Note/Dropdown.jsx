import React from 'react'
import { useDispatch } from 'react-redux'
import { moveNote } from '../../../redux/reducer'
import './Note.scss'

export const Dropdown = ({ showDropdown, allPages, pageName, noteId, setAlertContent, restartAlertsetTimeout }) => {
  const dispatch = useDispatch()
  const moveNoteHandler = (fromPage, toPage, noteId) => {
    restartAlertsetTimeout()
    dispatch(moveNote({ fromPage, toPage, noteId }))
    setAlertContent({ type: 'success', title: 'Note moved' })
  }
  return (
    <>
      {showDropdown && (
        <div className='dropdown'>
          <h6>Where to move?</h6>
          {allPages.length > 1 ? (
            allPages
              .filter(page => page !== pageName)
              .map(page => {
                return (
                  <div key={page} className='dropdownItem' onClick={() => moveNoteHandler(pageName, page, noteId)}>
                    <span>-</span>&nbsp;<span>{page}</span>
                  </div>
                )
              })
          ) : (
            <div className='text-center'>No other pages</div>
          )}
        </div>
      )}
    </>
  )
}
