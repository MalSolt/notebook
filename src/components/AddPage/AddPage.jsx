import React from "react"
import { NavLink } from "react-router-dom"
import Arrow from "../../img/arrow.svg"

export const AddPage = ({ addPage }) => {
  return (
    <div className="add-page">
      <div className="page-heiding">
        <NavLink to="/pages">
          <img className="come-back" src={Arrow} alt="come back" />
        </NavLink>
        <h2 className="text-right">Add page</h2>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Enter page name"
        onKeyDown={e => addPage(e)}
      />
    </div>
  )
}
