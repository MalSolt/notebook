import React, { useState } from "react"
import "./Note.scss"
import Arrow from "../../../img/arrow.svg"

export const Note = ({ moveNote, allPages, pageName, id, title, done, removeNote, toggleDone }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <li className="list-group-item">
      <div className="note-content">
        <input type="checkbox" readOnly checked={done} onClick={() => toggleDone(pageName, id)} />
        &nbsp;&nbsp; {done ? <s>{title}</s> : <span>{title}</span>}
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
              {allPages
                .filter(page => page !== pageName)
                .map(page => {
                  return (
                    <div className="dropdownItem" onClick={() => moveNote(pageName, page, id)}>
                      <span>-</span>&nbsp;<span>{page}</span>
                    </div>
                  )
                })}
            </div>
          )}
        </button>
      </div>
    </li>
  )
}
