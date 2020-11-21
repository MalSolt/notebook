import React from 'react'
import './Nav.scss'

export const Nav = ({ setShowAddPage }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <span className='navbar-brand' href='#'>
          <span className='logo'>NOTEBOOK</span>
        </span>
        <button className='btn btn-light ml-auto' onClick={() => setShowAddPage(true)}>
          + Add page
        </button>
      </div>
    </nav>
  )
}
