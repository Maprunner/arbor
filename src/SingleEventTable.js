import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import EventSummaryTable from "./EventSummaryTable"
import ClassResultTable from "./ClassResultTable"
import { Card } from "react-bootstrap"
import DocumentTitle from "react-document-title"
import { getEventAbbreviation } from "./utils.js"
import {
  selectEvent,
  fetchName,
  selectName,
  fetchResults,
  filterClasses,
} from "./actions/actions.js"

const SingleEventTable = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentRaceID === null) {
      // deep link to a particular event that needs to be loaded
      // location.pathname is e.g. '/event/123'
      const index = location.pathname.lastIndexOf("/")
      const raceID = location.pathname.substring(index + 1)
      handleDeepLink(parseInt(raceID, 10))
    }
  })

  const currentEventDetails = useSelector(
    (state) => state.events.currentEventDetails
  )
  const currentRaceID = useSelector((state) => state.events.currentRaceID)

  const resultData = useSelector((state) =>
    state.results.results.filter(function (result) {
      return state.results.filteredClasses.indexOf(result.Class) !== -1
    })
  )

  const classData = useSelector((state) => state.results.classes)

  const onNameSelected = (event) => {
    const name = event.node.data.Name
    dispatch(selectName(name))
    dispatch(fetchName(name))
    navigate("/person/" + name)
  }

  const onClassFilterUpdated = (newFilter) => {
    dispatch(filterClasses(newFilter))
  }

  const handleDeepLink = (raceID) => {
    dispatch(selectEvent(raceID))
    dispatch(fetchResults(raceID))
  }

  const title =
    getEventAbbreviation(currentEventDetails) || "Arbor | Event results"

  return (
    <div className="row">
      <div className="col-md-12">
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">
            Event Summary
          </Card.Header>
          <Card.Body className="ag-theme-fresh">
            <DocumentTitle title={title}>
              <EventSummaryTable rowData={currentEventDetails} />
            </DocumentTitle>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">Results</Card.Header>
          <Card.Body className="ag-theme-fresh">
            <ClassResultTable
              resultData={resultData}
              classData={classData}
              onNameSelected={onNameSelected}
              onClassFilterUpdated={onClassFilterUpdated}
              rowSelection="single"
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default SingleEventTable
