import {
  SAVE_EVENTS,
  SELECT_EVENT,
  SAVE_RESULTS,
  SELECT_NAME,
  SAVE_NAME,
  FILTER_CLASSES,
  SAVE_FIGHT_RESULTS,
  SELECT_FIGHT_NAMES,
} from "../actions/actions.js"
import { combineReducers } from "redux"

const tidyTime = (result) => {
  if (result.Time) {
    // convert hh:mm:ss to mmm:ss
    const fields = result.Time.split(":")
    if (fields.length === 3) {
      const hours = parseInt(fields[0], 10)
      const minutes = parseInt(fields[1], 10)
      result.Time = `${60 * hours + minutes}:${fields[2]}`
    }
  }
  return result
}

const initEvents = {
  eventData: [],
  currentRaceID: null,
  currentEventDetails: [],
  champions: [],
}

function getEventDetailsIndex(events, raceID) {
  const idx = events
    .map(function (x) {
      return parseInt(x.RaceID, 10)
    })
    .indexOf(raceID)
  return idx
}

function eventReducer(state = initEvents, action) {
  switch (action.type) {
    case SAVE_EVENTS:
      let currentDetails
      if (state.currentRaceID === null) {
        currentDetails = []
      } else {
        const idx = getEventDetailsIndex(action.events, state.currentRaceID)
        currentDetails = action.events.slice(idx, idx + 1)
      }
      return Object.assign({}, state, {
        eventData: action.events,
        champions: action.champions,
        currentEventDetails: currentDetails,
      })
    case SELECT_EVENT:
      const idx = getEventDetailsIndex(
        state.eventData,
        parseInt(action.raceID, 10)
      )
      return Object.assign({}, state, {
        currentRaceID: action.raceID,
        currentEventDetails: state.eventData.slice(idx, idx + 1),
      })
    default:
      return state
  }
}

const initName = {
  name: null,
  results: [],
}

function nameReducer(state = initName, action) {
  switch (action.type) {
    case SELECT_NAME:
      return {
        name: action.name,
        results: [],
      }
    case SAVE_NAME:
      action.results.map((result) => tidyTime(result))
      return {
        name: state.name,
        results: action.results,
      }
    default:
      return state
  }
}

const initResults = {
  results: [],
  classes: [],
  filteredClasses: [],
}

function resultReducer(state = initResults, action) {
  switch (action.type) {
    case SAVE_RESULTS:
      const classes = action.results.map(function (x) {
        return x.Class
      })
      action.results.map((result) => tidyTime(result))

      return {
        results: action.results,
        classes: [...new Set(classes)],
        filteredClasses: [...new Set(classes)],
      }
    case FILTER_CLASSES:
      return Object.assign({}, state, {
        filteredClasses: action.filter,
      })
    default:
      return state
  }
}

const initFight = {
  results: [],
  name1: null,
  name2: null,
}

function fightReducer(state = initFight, action) {
  switch (action.type) {
    case SAVE_FIGHT_RESULTS:
      action.fightResults.forEach(function (result) {
        result.Position1 = parseInt(result.Position1, 10)
        result.Position2 = parseInt(result.Position2, 10)
      })
      return Object.assign({}, state, {
        results: action.fightResults,
      })
    case SELECT_FIGHT_NAMES:
      return Object.assign({}, state, {
        name1: action.name1,
        name2: action.name2,
      })
    default:
      return state
  }
}

const reducers = combineReducers({
  events: eventReducer,
  results: resultReducer,
  name: nameReducer,
  fight: fightReducer,
})

export default reducers
