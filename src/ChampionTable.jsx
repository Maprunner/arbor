import React, { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AgGridReact } from "ag-grid-react"
import { Card } from "react-bootstrap"
import "./css/ag-grid.css"
import "./css/ag-theme-balham.css"
import {
  selectEvent,
  fetchResults,
  selectName,
  fetchName,
} from "./actions/actions.js"

const ChampionTable = () => {
  const champions = useSelector((state) => state.events.champions)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCellClicked = (event) => {
    const column = event.column.colId
    if (column === "M" || column === "W") {
      const name = column === "M" ? event.data.M : event.data.W
      // don't try to load names with ( which shows a club abbreviation for a relay
      // or / which shows a joint winner which we can't easily deal with
      // regex is "name doesn't match some characters followed by ( or /"
      if (!/.*[(|/]/.test(name)) {
        dispatch(selectName(name))
        dispatch(fetchName(name))
        navigate("/person/" + name)
      }
    } else {
      const raceID = parseInt(event.data.RaceID, 10)
      dispatch(selectEvent(raceID))
      dispatch(fetchResults(raceID))
      navigate("/event/" + raceID)
    }
  }

  const columnDefs = useMemo(() => {
    return [
      { headerName: "RaceID", field: "RaceID", hide: "true" },
      { headerName: "Event", field: "Event", width: 120 },
      {
        headerName: "Year",
        field: "Year",
        width: 75,
        cellClass: "center-text",
      },
      { headerName: "Area", field: "Area", width: 225 },
      {
        headerName: "Assoc",
        field: "Association",
        width: 75,
        cellClass: "center-text",
      },
      { headerName: "Men", field: "M", flex: 1 },
      { headerName: "Women", field: "W", flex: 1 },
    ]
  }, [])

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
    }
  }, [])

  useEffect(() => {
    document.title = "Arbor | Champions"
  }, [])

  return (
    <div className="row">
      <div className="col-md-12">
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">Champions</Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ padding: 0, height: "400px" }}
          >
            <AgGridReact
              rowData={champions}
              onCellClicked={(event) => onCellClicked(event)}
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

export default ChampionTable
