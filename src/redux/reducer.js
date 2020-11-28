import { createSlice } from '@reduxjs/toolkit'

const reducerSlice = createSlice({
  name: 'main',
  initialState: {
    Покупки: [
      { id: 1, title: 'Купить хлеб', done: false },
      { id: 2, title: 'Купить молоко', done: false },
    ],
    'Домашние дела': [
      { id: 3, title: 'Убраться в комнате', done: false },
      { id: 4, title: 'Помыть посуду', done: false },
    ],
  },
  reducers: {
    addPage(state, action) {
      const pageName = action.payload
      state[pageName] = []
    },
    removePage(state, action) {
      const pageName = action.payload
      delete state[pageName]
    },
    addNote(state, action) {
      const { noteTitle, pageName } = action.payload
      console.log(state)
      state[pageName].unshift({ id: Date.now(), title: noteTitle, done: false })
    },
    removeNote(state, action) {
      const { pageName, noteId } = action.payload
      state[pageName] = state[pageName].filter(note => note.id !== noteId)
    },
    moveNote(state, action) {
      const { fromPage, toPage, noteId } = action.payload
      state[fromPage].forEach((note, i, arr) => {
        if (note.id === noteId) {
          state[toPage].unshift(note)
          arr.splice(i, 1)
        }
      })
    },
    changeNote(state, action) {
      const { noteTitle, pageName, noteId } = action.payload
      state[pageName].forEach(note => {
        if (note.id === noteId) {
          note.title = noteTitle
        }
      })
    },
    toggleDone(state, action) {
      const { pageName, noteId } = action.payload
      state[pageName].forEach(note => {
        if (note.id === noteId) {
          note.done = !note.done
        }
      })
    },
  },
})

export const { addPage, removePage, addNote, removeNote, moveNote, changeNote, toggleDone } = reducerSlice.actions

export default reducerSlice.reducer
