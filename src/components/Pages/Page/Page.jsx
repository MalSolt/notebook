import React from 'react'
import { NavLink } from 'react-router-dom'
import './Page.scss'
import { useDispatch } from 'react-redux'
import { removePage } from '../../../redux/reducer'
export const Page = ({ pageName, restartAlertsetTimeout, setAlertContent }) => {
  const dispatch = useDispatch()
  const removePageHandler = pageName => {
    restartAlertsetTimeout()
    dispatch(removePage(pageName))
    setAlertContent({ type: 'danger', title: 'Page deleted' })
  }
  return (
    <div className='container page'>
      <span>{pageName}</span>
      <div className='buttons'>
        <NavLink to={pageName} className='btn btn-dark mr-1'>
          Open
        </NavLink>
        <button onClick={() => removePageHandler(pageName)} className='btn btn-danger'>
          delete
        </button>
      </div>
    </div>
  )
}
