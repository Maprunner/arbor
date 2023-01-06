import React, { useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import ClassFilter from "./ClassFilter"
import "./css/ag-grid.css"
import "./css/ag-theme-fresh.css"
import { formatPosition } from "./utils.js"

const ClassResultTable = (props) => {
  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "Class",
        field: "Class",
        width: 100,
        cellClass: "center-text",
      },
      {
        headerName: "Position",
        field: "Position",
        width: 100,
        cellClass: "center-text",
        cellRenderer: formatPosition,
      },
      { headerName: "Name", field: "Name", width: 200 },
      {
        headerName: "Club",
        field: "Club",
        width: 100,
        cellClass: "center-text",
      },
      {
        headerName: "Time",
        field: "Time",
        width: 100,
        cellClass: "center-text",
      },
    ]
  }, [])

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
    }
  }, [])

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <ClassFilter
          classes={props.classData}
          onClassFilterUpdated={props.onClassFilterUpdated}
        />
      </div>
      <div style={{ height: "600px" }}>
        <AgGridReact
          rowData={props.resultData}
          onRowClicked={props.onNameSelected}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  )
}

export default ClassResultTable
