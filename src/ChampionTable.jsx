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
    const raceID = parseInt(event.data.RaceID, 10)
    // raceIDs over 10000 are relays amd other event types that don't have individual results so just ignore the click
    if (raceID < 10000) {
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
        dispatch(selectEvent(raceID))
        dispatch(fetchResults(raceID))
        navigate("/event/" + raceID)
      }
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
        headerName: "Assoc",
        field: "Association",
        cellClass: "center-text",
      },
      { headerName: "Men", field: "M" },
      { headerName: "Women", field: "W" },
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

  const autoSizeStrategy = {
    type: "fitCellContents",
  }

  const autoSizeColumns = (props) => {
    props.api.autoSizeAllColumns()
  }


  const rowSelection = {
    mode: "singleRow",
    enableClickSelection: "enableSelection",
    checkboxes: false,
  }

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
              onFirstDataRendered={autoSizeColumns}
              onGridSizeChanged={autoSizeColumns}
              autoSizeStrategy={autoSizeStrategy}
              suppressColumnVirtualisation={true}
              rowData={champions}
              onCellClicked={(event) => onCellClicked(event)}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={rowSelection}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default ChampionTable
