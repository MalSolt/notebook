import React from 'react'
import './Note.scss'

export const Dropdown = ({ moveNoteHandler, showDropdown, allPages, pageName, noteId }) => {
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
