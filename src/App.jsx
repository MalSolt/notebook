import React, { useEffect, useState } from "react"
import { NavLink, Route, Switch, useHistory } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import "./App.scss"
import { AddPage } from "./components/AddPage/AddPage"
import { Notes } from "./components/Notes/Notes"
import { Pages } from "./components/Pages/Pages"

let hideAlert = null
function App() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState({
    type: "success",
    title: "Page was created",
  })
  const history = useHistory()
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("state")) || {}
  )
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state))
  }, [state])

  const addPage = e => {
    if (e.key === "Enter") {
      clearInterval(hideAlert)
      hideAlert = setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      setShowAlert(true)
      if (e.target.value.trim()) {
        setState({ [e.target.value.trim()]: [], ...state })
        e.target.value = ""
        history.push("/pages")
        setAlertContent({ type: "success", title: "Page was created" })
      } else {
        setAlertContent({ type: "warning", title: "Enter page title" })
      }
    }
  }

  const removePage = pageName => {
    clearInterval(hideAlert)
    hideAlert = setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    setShowAlert(true)
    let obj = { ...state }
    delete obj[pageName]
    setState(obj)
    setAlertContent({ type: "danger", title: "Page deleted" })
  }

  const addNote = (e, pageName) => {
    if (e.key === "Enter") {
      clearInterval(hideAlert)
      hideAlert = setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      setShowAlert(true)
      if (e.target.value.trim()) {
        setState({
          ...state,
          [pageName]: [
            { id: Date.now(), title: e.target.value.trim(), done: false },
            ...state[pageName],
          ],
        })
        e.target.value = ""
        setAlertContent({ type: "success", title: "Note was created" })
      } else {
        setAlertContent({ type: "warning", title: "Enter note title" })
      }
    }
  }

  const removeNote = (e, pageName, id) => {
    clearInterval(hideAlert)
    hideAlert = setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    setShowAlert(true)
    setState({
      ...state,
      [pageName]: state[pageName].filter(note => note.id !== id),
    })
    e.target.value = ""
    setAlertContent({ type: "danger", title: "Note deleted" })
  }

  const toggleDone = (pageName, id) => {
    setState({
      ...state,
      [pageName]: state[pageName].map(note => {
        return note.id === id ? { ...note, done: !note.done } : note
      }),
    })
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand" href="#">
            <span className="logo">NOTEBOOK</span>
          </span>
          <NavLink to="/addPage">
            <button className="btn btn-light ml-auto">+ Add page</button>
          </NavLink>
        </div>
      </nav>
      <CSSTransition
        in={showAlert}
        timeout={500}
        classNames="alert"
        mountOnEnter
        unmountOnExit
      >
        <div className={`alert alert-${alertContent.type} alert-dismissible`}>
          <strong>Attention!</strong> {alertContent.title}
          <button className="close" onClick={() => setShowAlert(false)}>
            &times;
          </button>
        </div>
      </CSSTransition>
      <Switch>
        <Route exact path="/addPage">
          <h1 className=" text-center">Add page</h1>
        </Route>
        <Route exact path={["/", "/pages"]}>
          <h1 className=" text-center">All pages</h1>
        </Route>
        <Route exact path="*">
          <h1 className=" text-center">Notes</h1>
        </Route>
      </Switch>
      <div className="container pt-4 all-pages">
        <Route exact path="/addPage">
          {({ match }) => (
            <CSSTransition
              timeout={700}
              classNames="item"
              in={match != null}
              unmountOnExit
            >
              <div className="absolute">
                <AddPage addPage={addPage} />
              </div>
            </CSSTransition>
          )}
        </Route>
        <Route exact path={["/", "/pages"]}>
          {({ match }) => (
            <CSSTransition
              timeout={700}
              classNames="pages"
              in={match != null}
              unmountOnExit
            >
              <div className="absolute">
                <Pages state={state} removePage={removePage} />
              </div>
            </CSSTransition>
          )}
        </Route>
        {/* <TransitionGroup> */}
        {Object.keys(state).map(page => {
          return (
            <Route key={page} exact path={`/${page}`}>
              {({ match }) => (
                <CSSTransition
                  timeout={700}
                  classNames="item"
                  in={match != null}
                  unmountOnExit
                >
                  <div className="absolute">
                    <Notes
                      addNote={addNote}
                      state={state}
                      page={page}
                      removeNote={removeNote}
                      toggleDone={toggleDone}
                    />
                  </div>
                </CSSTransition>
              )}
            </Route>
          )
        })}
        {/* </TransitionGroup> */}
      </div>
    </>
  )
}

export default App
