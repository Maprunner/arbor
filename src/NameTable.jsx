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
      { headerName: "Event", field: "Event" },
      {
        headerName: "Year",
        field: "Year",
        cellClass: "center-text",
      },
      { headerName: "Area", field: "Area", flex: 1 },
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
    console.log("Autosize")
    props.api.autoSizeAllColumns()
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
            <Badge bg="warning" text="dark">
              Total {props.results.length}
            </Badge>
            <Badge bg="warning" text="dark">
              BOC {countEntries("British Long")}
            </Badge>
            <Badge bg="warning" text="dark">
              BSC {countEntries("British Sprint")}
            </Badge>
            <Badge bg="warning" text="dark">
              BMC {countEntries("British Middle")}
            </Badge>
            <Badge bg="warning" text="dark">
              BNC {countEntries("British Night")}
            </Badge>
            <Badge bg="warning" text="dark">
              JKD1 {countEntries("JK Day 1")}
            </Badge>
            <Badge bg="warning" text="dark">
              JKD2 {countEntries("JK Day 2")}
            </Badge>
            <Badge bg="warning" text="dark">
              JKS {countEntries("JK Sprint")}
            </Badge>
          </Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ padding: 0, height: "400px" }}
          >
            <AgGridReact
              firstDataRendered={autoSizeColumns}
              onGridSizeChanged={autoSizeColumns}
              autoSizeStrategy={autoSizeStrategy}
              suppressColumnVirtualisation={true}
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
