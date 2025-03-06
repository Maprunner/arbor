import React, { useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import ClassFilter from "./ClassFilter"
import "./css/ag-grid.css"
import "./css/ag-theme-balham.css"
import { formatPosition } from "./utils"

const ClassResultTable = (props) => {
  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "Class",
        field: "Class",
        cellClass: "center-text",
      },
      {
        headerName: "Position",
        field: "Position",
        cellClass: "center-text",
        cellRenderer: formatPosition,
      },
      { headerName: "Name", field: "Name" },
      {
        headerName: "Club",
        field: "Club",
        cellClass: "center-text",
      },
      {
        headerName: "Time",
        field: "Time",
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

  const autoSizeStrategy = {
    type: "fitCellContents",
  }

  const autoSizeColumns = (props) => {
    props.api.autoSizeAllColumns()
  }

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <ClassFilter
          classes={props.classData}
          onClassFilterUpdated={props.onClassFilterUpdated}
        />
      </div>
      <div style={{ height: "600px" }}>
        <AgGridReact
          onFirstDataRendered={autoSizeColumns}
          onGridSizeChanged={autoSizeColumns}
          autoSizeStrategy={autoSizeStrategy}
          suppressColumnVirtualisation={true}
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
