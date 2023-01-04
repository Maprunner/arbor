import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import NameTable from "./NameTable"
import NameSearch from "./NameSearch"
import DocumentTitle from "react-document-title"
import {
  selectEvent,
  fetchResults,
  selectName,
  fetchName,
} from "./actions/actions.js"

const Person = () => {
  const name = useSelector((state) => state.name.name)
  const results = useSelector((state) => state.name.results)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (name === null) {
      // check for deep link to a particular name that needs to be loaded
      // location.pathname is e.g. '/person/Simon%20Errington'
      const bits = location.pathname.split("/")
      if (bits.length === 3) {
        const name = bits[2].replace("%20", " ")
        onNameSelected(name, false)
      }
    }
  })

  const onRowSelected = (event) => {
    const raceID = parseInt(event.node.data.RaceID, 10)
    dispatch(selectEvent(raceID))
    dispatch(fetchResults(raceID))
    navigate("/event/" + raceID)
  }

  const onNameSelected = (name, doPush = true) => {
    dispatch(selectName(name))
    dispatch(fetchName(name))
    if (doPush) {
      navigate("/person/" + name)
    }
  }

  const title = name || " Arbor | Name search"
  return (
    <div>
      <DocumentTitle title={title}>
        <NameSearch onNameSelected={onNameSelected} caption="Name search" />
      </DocumentTitle>
      <NameTable name={name} results={results} onRowSelected={onRowSelected} />
    </div>
  )
}

export default Person
