import React, { useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import "./css/ag-grid.css"
import "./css/ag-theme-balham.css"
import { formatLink } from "./utils"

const EventSummaryTable = (props) => {
  const autoSizeColumns = (props) => {
    props.api.autoSizeAllColumns()
  }

  const columnDefs = useMemo(() => {
    return [
      { headerName: "Event", field: "Event" },
      {
        headerName: "Year",
        field: "Year",
        cellClass: "center-text",
      },
      { headerName: "Area", field: "Area" },
      {
        headerName: "Date",
        field: "Date",
        cellClass: "center-text",
      },
      {
        headerName: "Club",
        field: "Club",
        cellClass: "center-text",
      },
      {
        headerName: "Classes",
        field: "Classes",
        cellClass: "center-text",
      },
      {
        headerName: "Runners",
        field: "Runners",
        cellClass: "center-text",
      },
      {
        headerName: "Link",
        field: "Link",
        cellRenderer: formatLink,
      },
      {
        headerName: "Assoc",
        field: "Association",
        cellClass: "center-text",
      },
    ]
  }, [])

  const autoSizeStrategy = {
    type: "fitCellContents",
  }

  return (
    <div style={{ width: "100%" }}>
      <AgGridReact
        rowData={props.rowData}
        onFirstDataRendered={autoSizeColumns}
        onGridSizeChanged={autoSizeColumns}
        columnDefs={columnDefs}
        autoSizeStrategy={autoSizeStrategy}
        suppressColumnVirtualisation={true}
        domLayout={"autoHeight"}
      />
    </div>
  )
}

export default EventSummaryTable
