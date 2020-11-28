import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPage } from '../../redux/reducer'

export const AddPage = ({ setAlertContent, setShowAddPage }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.state)
  const addPageHandler = e => {
    if (e.target.value.trim()) {
      if (Object.keys(state).some(page => page.toLowerCase() === e.target.value.replace(/ +/g, ' ').trim().toLowerCase())) {
        setAlertContent({ type: 'warning', title: 'page  exists' })
      } else {
        dispatch(addPage(e.target.value.trim()))
        setAlertContent({ type: 'success', title: 'Page added' })
        e.target.value = ''
      }
    } else {
      setAlertContent({ type: 'warning', title: 'Enter page title' })
    }
  }
  return (
    <div className='add-page'>
      <div className='page-heiding'>
        <button className='btn btn-danger btn-sm' onClick={() => setShowAddPage(false)}>
          Hide
        </button>
        <h2 className='text-right'>Add page</h2>
      </div>
      <input
        type='text'
        className='form-control'
        placeholder='Enter page name'
        onKeyDown={e => e.key === 'Enter' && addPageHandler(e)}
      />
      <hr />
    </div>
  )
}
