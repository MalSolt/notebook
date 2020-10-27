import React, { useState } from "react"
import "./Note.scss"
import Arrow from "../../../img/arrow.svg"
import Edit from "../../../img/edit.svg"

export const Note = ({ changeNote, moveNote, allPages, pageName, id, title, done, removeNote, toggleDone }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [editTitleMode, setEditTitleMode] = useState(false)
  return (
    <li className="list-group-item">
      {editTitleMode ? (
        <input
          onKeyDown={e => {
            if (e.key === "Enter") {
              changeNote(e, pageName, id)
              setEditTitleMode(false)
            }
          }}
          autoFocus
          className="form-control"
          defaultValue={title}
        />
      ) : (
        <>
          <div className="note-content">
            <input type="checkbox" readOnly checked={done} onClick={() => toggleDone(pageName, id)} />
            &nbsp;&nbsp;
            {done ? <s>{title}</s> : <span>{title}</span>}
            &nbsp;
            <img onClick={() => setEditTitleMode(!editTitleMode)} className="edit" src={Edit} alt="" />
          </div>
          <div className="buttons">
            <button onClick={e => removeNote(e, pageName, id)} className="btn btn-outline-danger btn-sm">
              &times;
            </button>
            <button onClick={() => setShowDropdown(!showDropdown)} className="btn btn-primary btn-sm dropdownToggle">
              <img src={Arrow} alt=":" />
              {showDropdown && (
                <div className="dropdown">
                  <h6>Where to move?</h6>
                  {allPages.length > 1 ? (
                    allPages
                      .filter(page => page !== pageName)
                      .map(page => {
                        return (
                          <div className="dropdownItem" onClick={() => moveNote(pageName, page, id)}>
                            <span>-</span>&nbsp;<span>{page}</span>
                          </div>
                        )
                      })
                  ) : (
                    <div className="text-center">No other pages</div>
                  )}
                </div>
              )}
            </button>
          </div>
        </>
      )}
    </li>
  )
}
