import React, { useEffect, useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { selectEvent, fetchResults } from "./actions/actions.js"
import "./css/ag-grid.css"
import "./css/ag-theme-balham.css"
import { formatLink } from "./utils"
import { useNavigate } from "react-router-dom"

const EventsTable = () => {
  const events = useSelector((state) => state.events.eventData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onGridReady = (event) => {
    event.api.sizeColumnsToFit()
  }

  const onRowSelected = (event) => {
    const raceID = event.node.data.RaceID
    dispatch(selectEvent(raceID))
    dispatch(fetchResults(raceID))
    navigate("/event/" + raceID)
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
      {
        headerName: "Date",
        field: "Date",
        width: 100,
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
      {
        headerName: "Area",
        field: "Area",
        flex: 1,
      },
      {
        headerName: "Link",
        field: "Link",
        width: 75,
        cellRenderer: formatLink,
        filter: false,
        sortable: false,
      },
      {
        headerName: "Assoc",
        field: "Association",
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

  useEffect(() => {
    document.title = "Arbor"
  }, [])

  return (
    <div className="row">
      <div className="col-md-12">
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">All Events</Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ padding: 0, height: "400px" }}
          >
            <AgGridReact
              onGridReady={onGridReady}
              onRowSelected={onRowSelected}
              rowData={events}
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

export default EventsTable
