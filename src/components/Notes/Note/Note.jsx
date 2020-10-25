import React from "react"
import "./Note.scss"

export const Note = ({ pageName, id, title, done, removeNote, toggleDone }) => (
  <li className="list-group-item">
    <div className="note-content">
      <input type="checkbox" readOnly checked={done} onClick={() => toggleDone(pageName, id)} />
      &nbsp;&nbsp; {done ? <s>{title}</s> : <span>{title}</span>}
    </div>
    <button onClick={e => removeNote(e, pageName, id)} className="btn btn-outline-danger btn-sm">
      &times;
    </button>
  </li>
)
