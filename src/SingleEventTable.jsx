import React, { useEffect } from "react"
import { createSelector } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import EventSummaryTable from "./EventSummaryTable"
import ClassResultTable from "./ClassResultTable"
import { Card } from "react-bootstrap"
import { getEventAbbreviation } from "./utils"
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

  const selectResults = (state) => state.results.results
  const selectFilteredClasses = (state) => state.results.filteredClasses

  const memoizedResultData = createSelector(
    [selectResults, selectFilteredClasses],
    (results, filteredClasses) => {
      return results.filter(function (result) {
        return filteredClasses.indexOf(result.Class) !== -1
      })
    }
  )

  const resultData = useSelector(memoizedResultData)

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

  useEffect(() => {
    document.title =
      getEventAbbreviation(currentEventDetails) || "Arbor | Event results"
  }, [currentEventDetails])

  return (
    <div className="row">
      <div className="col-md-12">
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">
            Event Summary
          </Card.Header>
          <Card.Body className="ag-theme-balham" style={{ padding: 0 }}>
            <EventSummaryTable rowData={currentEventDetails} />
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header className="bg-arbor text-white">Results</Card.Header>
          <Card.Body className="ag-theme-balham" style={{ padding: 0 }}>
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
