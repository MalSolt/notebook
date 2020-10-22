import React from "react"
import { NavLink } from "react-router-dom"
import "./Page.scss"

export const Page = ({ pageName, removePage }) => {
  return (
    <div className="container page">
      <span>{pageName}</span>
      <div className="buttons">
        <NavLink to={pageName} className="btn btn-dark mr-1">
          Open
        </NavLink>
        <button onClick={() => removePage(pageName)} className="btn btn-danger">
          delete
        </button>
      </div>
    </div>
  )
}
