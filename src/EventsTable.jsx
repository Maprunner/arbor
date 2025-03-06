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

  const autoSizeColumns = (props) => {
    props.api.autoSizeAllColumns()
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
      { headerName: "Event", field: "Event" },
      {
        headerName: "Year",
        field: "Year",
        cellClass: "center-text",
      },
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
        headerName: "Area",
        field: "Area",
      },
      {
        headerName: "Link",
        field: "Link",
        cellRenderer: formatLink,
        filter: false,
        sortable: false,
      },
      {
        headerName: "Assoc",
        field: "Association",
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

  const autoSizeStrategy = {
    type: "fitCellContents",
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
          <Card.Header className="bg-arbor text-white">All Events</Card.Header>
          <Card.Body
            className="ag-theme-balham"
            style={{ padding: 0, height: "400px" }}
          >
            <AgGridReact
              onGridReady={autoSizeColumns}
              onGridSizeChanged={autoSizeColumns}
              autoSizeStrategy={autoSizeStrategy}
              suppressColumnVirtualisation={true}
              onRowSelected={onRowSelected}
              rowData={events}
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

export default EventsTable
