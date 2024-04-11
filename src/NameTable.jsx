import React, { useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import "./css/ag-grid.css"
import "./css/ag-theme-balham.css"
import { Badge, Card } from "react-bootstrap"
import { formatPosition } from "./utils"

const NameTable = (props) => {
  const countEntries = (eventName) => {
    const count = props.results.reduce(function (total, event) {
      return event.Event === eventName ? total + 1 : total
    }, 0)
    return count
  }

  const columnDefs = useMemo(() => {
    return [
      { headerName: "RaceID", field: "RaceID", hide: "true" },
      { headerName: "Event", field: "Event", width: 100 },
      {
        headerName: "Year",
        field: "Year",
        width: 75,
        cellClass: "center-text",
      },
      { headerName: "Area", field: "Area", flex: 1 },
      {
        headerName: "Class",
        field: "Class",
        width: 75,
        cellClass: "center-text",
      },
      {
        headerName: "Position",
        field: "Position",
        width: 75,
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

  const onGridReady = (props) => {
    props.api.sizeColumnsToFit()
  }

  let info
  if (props.results.length === 0) {
    info = "Results"
  } else {
    info = "Results for " + props.name
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">
            {info}
            <Badge pill variant="light">
              Total {props.results.length}
            </Badge>
            <Badge variant="light">BOC {countEntries("British Long")}</Badge>
            <Badge variant="light">BSC {countEntries("British Sprint")}</Badge>
            <Badge variant="light">BMC {countEntries("British Middle")}</Badge>
            <Badge variant="light">BNC {countEntries("British Night")}</Badge>
            <Badge variant="light">JKD1 {countEntries("JK Day 1")}</Badge>
            <Badge variant="light">JKD2 {countEntries("JK Day 2")}</Badge>
            <Badge variant="light">JKS {countEntries("JK Sprint")}</Badge>
          </Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ padding: 0, height: "400px" }}
          >
            <AgGridReact
              onGridReady={onGridReady}
              onRowSelected={props.onRowSelected}
              rowData={props.results}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="single"
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default NameTable
