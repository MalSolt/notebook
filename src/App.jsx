import React, { useState, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import './App.scss'
import { AddPage } from './components/AddPage/AddPage'
import { Alert } from './components/Alert/Alert'
import { Notes } from './components/Notes/Notes'
import { Pages } from './components/Pages/Pages'
import { Nav } from './components/Nav/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, addPage, changeNote, moveNote, removeNote, removePage } from './redux/reducer'

function App() {
  const dispatch = useDispatch()
  const state = useSelector(state => state.state)

  const [showAddPage, setShowAddPage] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState({
    type: 'success',
    title: 'Page added',
  })

  const hideAlert = useRef()

  const restartAlertsetTimeout = () => {
    clearInterval(hideAlert.current)
    hideAlert.current = setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    setShowAlert(true)
  }

  const addPageHandler = e => {
    restartAlertsetTimeout()
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

  const removePageHandler = pageName => {
    restartAlertsetTimeout()
    dispatch(removePage(pageName))
    setAlertContent({ type: 'danger', title: 'Page deleted' })
  }

  const addNoteHandler = (e, pageName) => {
    const noteTitle = e.target.value.trim()
    if (e.key === 'Enter') {
      restartAlertsetTimeout()
      if (e.target.value.trim()) {
        dispatch(addNote({ noteTitle, pageName }))
        e.target.value = ''
        setAlertContent({ type: 'success', title: 'Note added' })
      } else {
        setAlertContent({ type: 'warning', title: 'Enter note title' })
      }
    }
  }

  const removeNoteHandler = (pageName, noteId) => {
    restartAlertsetTimeout()
    dispatch(removeNote({ pageName, noteId }))
    setAlertContent({ type: 'danger', title: 'Note deleted' })
  }

  const moveNoteHandler = (fromPage, toPage, noteId) => {
    restartAlertsetTimeout()
    dispatch(moveNote({ fromPage, toPage, noteId }))
    setAlertContent({ type: 'success', title: 'Note moved' })
  }

  const changeNoteHandler = (e, pageName, noteId) => {
    const noteTitle = e.target.value.trim()
    restartAlertsetTimeout()
    if (e.target.value.trim()) {
      dispatch(changeNote({ noteTitle, pageName, noteId }))
      setAlertContent({ type: 'success', title: 'Note changed' })
    } else {
      setAlertContent({ type: 'warning', title: 'Enter note title' })
    }
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
                {showAddPage && <AddPage setShowAddPage={setShowAddPage} addPageHandler={addPageHandler} />}
                <Pages state={state} removePageHandler={removePageHandler} />
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
                    changeNoteHandler={changeNoteHandler}
                    state={state}
                    moveNoteHandler={moveNoteHandler}
                    addNoteHandler={addNoteHandler}
                    allPages={Object.keys(state)}
                    page={page}
                    removeNoteHandler={removeNoteHandler}
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

export default App
