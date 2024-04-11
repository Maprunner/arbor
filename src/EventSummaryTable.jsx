import React, { useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import "./css/ag-grid.css"
import "./css/ag-theme-balham.css"
import { formatLink } from "./utils"

const EventSummaryTable = (props) => {
  const onGridReady = (props) => {
    props.api.sizeColumnsToFit()
  }

  const columnDefs = useMemo(() => {
    return [
      { headerName: "Event", field: "Event", width: 125 },
      {
        headerName: "Year",
        field: "Year",
        width: 75,
        cellClass: "center-text",
      },
      {
        headerName: "Date",
        field: "Date",
        width: 125,
        cellClass: "center-text",
      },
      {
        headerName: "Club",
        field: "Club",
        width: 100,
        cellClass: "center-text",
      },
      {
        headerName: "Classes",
        field: "Classes",
        width: 100,
        cellClass: "center-text",
      },
      {
        headerName: "Runners",
        field: "Runners",
        width: 100,
        cellClass: "center-text",
      },
      { headerName: "Area", field: "Area", width: 300 },
      {
        headerName: "Link",
        field: "Link",
        width: 75,
        cellRenderer: formatLink,
      },
      {
        headerName: "Assoc",
        field: "Association",
        width: 100,
        cellClass: "center-text",
      },
    ]
  }, [])

  return (
    <div style={{ height: "65px" }}>
      <AgGridReact
        rowData={props.rowData}
        onGridReady={onGridReady}
        columnDefs={columnDefs}
      />
    </div>
  )
}

export default EventSummaryTable
