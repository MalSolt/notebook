import React, { useState, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import './App.scss'
import { AddPage, Alert, Notes, Pages, Nav } from './components'
import { useSelector } from 'react-redux'

export function App() {
  const state = useSelector(state => state.state)
  const [showAddPage, setShowAddPage] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState({})

  const hideAlert = useRef()

  const restartAlertsetTimeout = () => {
    clearInterval(hideAlert.current)
    hideAlert.current = setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    setShowAlert(true)
  }

  return (
    <>
      <Nav setShowAddPage={setShowAddPage} />
      <CSSTransition in={showAlert} timeout={500} classNames='alert' mountOnEnter unmountOnExit>
        <Alert alertContent={alertContent} setShowAlert={setShowAlert} />
      </CSSTransition>
      <Switch>
        <Route exact path={['/', '/pages']}>
          <h1 className=' text-center'>All pages</h1>
        </Route>
        <Route exact path='*'>
          <h1 className=' text-center'>Notes</h1>
        </Route>
      </Switch>
      <div className='container pt-4 all-pages'>
        <Route exact path={['/', '/pages']}>
          {({ match }) => (
            <CSSTransition timeout={700} classNames='pages' in={match != null} unmountOnExit>
              <div className='absolute'>
                {showAddPage && (
                  <AddPage
                    setShowAddPage={setShowAddPage}
                    restartAlertsetTimeout={restartAlertsetTimeout}
                    setAlertContent={setAlertContent}
                  />
                )}
                <Pages setAlertContent={setAlertContent} restartAlertsetTimeout={restartAlertsetTimeout} />
              </div>
            </CSSTransition>
          )}
        </Route>
        {Object.keys(state).map(page => (
          <Route key={page} exact path={`/${page}`}>
            {({ match }) => (
              <CSSTransition timeout={700} classNames='page' in={match != null} unmountOnExit>
                <div className='absolute'>
                  <Notes
                    setAlertContent={setAlertContent}
                    restartAlertsetTimeout={restartAlertsetTimeout}
                    allPages={Object.keys(state)}
                    page={page}
                  />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </>
  )
}
