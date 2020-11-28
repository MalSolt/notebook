import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { HashRouter } from 'react-router-dom'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
