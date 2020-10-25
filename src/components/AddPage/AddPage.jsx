import React from "react"

export const AddPage = ({ addPage, setShowAddPage }) => {
  return (
    <div className="add-page">
      <div className="page-heiding">
        <button className="btn btn-danger btn-sm" onClick={() => setShowAddPage(false)}>
          Hide
        </button>
        <h2 className="text-right">Add page</h2>
      </div>
      <input type="text" className="form-control" placeholder="Enter page name" onKeyDown={e => addPage(e)} />
      <hr />
    </div>
  )
}
