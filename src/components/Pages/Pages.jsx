import React from "react"
import { Page } from "./Page/Page"

export const Pages = ({ state, removePage }) => {
  return (
    <div className="pages">
      {Object.keys(state).length ? (
        Object.keys(state).map(page => {
          return <Page removePage={removePage} key={page} pageName={page} />
        })
      ) : (
        <h2 className="text-center">The notebook is empty...</h2>
      )}
    </div>
  )
}
