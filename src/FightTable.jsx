import React, { useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import { Card } from "react-bootstrap"
import "./css/ag-grid.css"
import "./css/ag-theme-balham.css"
import { Badge } from "react-bootstrap"

const FightTable = (props) => {
  const formatPosition = (params) => {
    return parseInt(params.value, 10) === 999 ? "-" : params.value
  }

  const formatWinner1 = (params) => {
    if (params.node.data.Position1 < params.node.data.Position2) {
      return <strong>{params.value}</strong>
    } else {
      return params.value
    }
  }

  const formatWinner2 = (params) => {
    if (params.node.data.Position2 < params.node.data.Position1) {
      return <strong>{params.value}</strong>
    } else {
      return params.value
    }
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
      { headerName: "Area", field: "Area" },
      {
        headerName: "Class",
        field: "Class",
        cellClass: "center-text",
      },
      {
        headerName: "Runner 1",
        field: "Name1",
        cellRenderer: formatWinner1,
      },
      {
        headerName: "Club",
        field: "Club1",
        cellClass: "center-text",
      },
      {
        headerName: "Time",
        field: "Time1",
        cellClass: "center-text",
      },
      {
        headerName: "Place",
        field: "Position1",
        cellClass: "center-text",
        cellRenderer: formatPosition,
      },
      {
        headerName: "Runner 2",
        field: "Name2",
        cellRenderer: formatWinner2,
      },
      {
        headerName: "Club",
        field: "Club2",
        cellClass: "center-text",
      },
      {
        headerName: "Time",
        field: "Time2",
        cellClass: "center-text",
      },
      {
        headerName: "Place",
        field: "Position2",
        cellClass: "center-text",
        cellRenderer: formatPosition,
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

  const info =
    "Fight: " +
    (props.name1 || "Runner 1") +
    " v. " +
    (props.name2 || "Runner 2")
  let r1Wins = 0
  if (props.results.length !== 0) {
    r1Wins = props.results.reduce(function (wins, result) {
      return result.Position1 < result.Position2 ? wins + 1 : wins
    }, 0)
  }
  let r2Wins = 0
  if (props.results.length !== 0) {
    r2Wins = props.results.reduce(function (wins, result) {
      return result.Position2 < result.Position1 ? wins + 1 : wins
    }, 0)
  }
  const draws = props.results.length - r1Wins - r2Wins

  return (
    <div className="row">
      <div className="col-md-12">
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">
            {info}
            <Badge bg="warning" text="dark">
              Played {props.results.length}
            </Badge>
            <Badge bg="warning" text="dark">
              {props.name1} Wins: {r1Wins}
            </Badge>
            <Badge bg="warning" text="dark">
              {props.name2} Wins: {r2Wins}
            </Badge>
            <Badge bg="warning" text="dark">
              Draws: {draws}
            </Badge>
          </Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ padding: 0, height: "500px" }}
          >
            <AgGridReact
              firstDataRendered={autoSizeColumns}
              onGridSizeChanged={autoSizeColumns}
              autoSizeStrategy={autoSizeStrategy}
              suppressColumnVirtualisation={true}
              onRowSelected={props.onFightRowSelected}
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

export default FightTable
