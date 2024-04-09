import React, { useEffect } from "react"
import FightTable from "./FightTable"
import NameSearch from "./NameSearch"
import {
  fetchFight,
  fetchResults,
  selectEvent,
  selectFightNames,
} from "./actions/actions.js"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

const FightLayout = () => {
  const name1 = useSelector((state) => state.fight.name1)
  const name2 = useSelector((state) => state.fight.name2)
  const results = useSelector((state) => state.fight.results)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (name1 === null && name2 === null) {
      // check for deep link to a particular fight that needs to be loaded
      // location.pathname is e.g. '/fight/Simon%20Errington/Helen%20Errington'
      const bits = location.pathname.split("/")
      if (bits.length === 4) {
        const n1 = bits[2].replace("%20", " ")
        const n2 = bits[3].replace("%20", " ")
        dispatch(selectFightNames(n1, n2))
        onFightSelected(n1, n2, false)
      }
    }
  })
  const onFightSelected = (name1, name2, doPush = true) => {
    dispatch(fetchFight(name1, name2))
    if (doPush) {
      navigate("/fight/" + name1 + "/" + name2)
    }
  }
  const onFightRowSelected = (event) => {
    dispatch(selectEvent(event.data.RaceID))
    dispatch(fetchResults(event.data.RaceID))
    navigate("/event/" + event.data.RaceID)
  }

  const onName1Selected = (name1) => {
    dispatch(selectFightNames(name1, name2))
    if (name2 !== null) {
      onFightSelected(name1, name2)
    }
  }

  const onName2Selected = (name2) => {
    dispatch(selectFightNames(name1, name2))
    if (name1 !== null) {
      onFightSelected(name1, name2)
    }
  }

  useEffect(() => {
    document.title = "Arbor | Fight"
  }, [])

  return (
    <div>
      <NameSearch onNameSelected={onName1Selected} caption="Runner 1" />
      <NameSearch onNameSelected={onName2Selected} caption="Runner 2" />
      <FightTable
        name1={name1}
        name2={name2}
        results={results}
        onFightRowSelected={onFightRowSelected}
      />
    </div>
  )
}

export default FightLayout
