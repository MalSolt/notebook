import React from 'react'
import { Page } from './Page/Page'
import { useSelector } from 'react-redux'
export const Pages = ({ setAlertContent }) => {
  const state = useSelector(state => state.state)

  return (
    <div className='pages'>
      {Object.keys(state).length ? (
        Object.keys(state).map(page => {
          return <Page key={page} pageName={page} setAlertContent={setAlertContent} />
        })
      ) : (
        <h2 className='text-center'>The notebook is empty...</h2>
      )}
    </div>
  )
}
