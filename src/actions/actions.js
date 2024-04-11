import axios from "axios"

export const SAVE_EVENTS = "SAVE_EVENTS"
export const SELECT_EVENT = "SELECT_EVENT"
export const SELECT_NAME = "SELECT_NAME"
export const SAVE_RESULTS = "SAVE_RESULTS"
export const SAVE_FIGHT_RESULTS = "SAVE_FIGHT_RESULTS"
export const SAVE_NAME = "SAVE_NAME"
export const SELECT_FIGHT_NAMES = "SELECT_FIGHT_NAMES"
export const FILTER_CLASSES = "FILTER_CLASSES"

export function selectEvent(raceID) {
  return {
    type: SELECT_EVENT,
    raceID: raceID,
  }
}

export function selectName(name) {
  return {
    type: SELECT_NAME,
    name: name,
  }
}

export function saveEvents(data) {
  return {
    type: SAVE_EVENTS,
    events: data.events,
    champions: data.champions,
  }
}

export function saveName(nameData) {
  return {
    type: SAVE_NAME,
    results: nameData,
  }
}

export function selectFightNames(name1, name2) {
  return {
    type: SELECT_FIGHT_NAMES,
    name1: name1,
    name2: name2,
  }
}

export function saveResults(resultData) {
  return {
    type: SAVE_RESULTS,
    results: resultData,
  }
}

export function saveFightResults(fightResultData) {
  return {
    type: SAVE_FIGHT_RESULTS,
    fightResults: fightResultData,
  }
}

export function filterClasses(filter) {
  return {
    type: FILTER_CLASSES,
    // this is an array of classes to be displayed
    filter: filter,
  }
}

export const axiosConfig = {
  headers: { Accept: "application/json" },
  // API depends on if we are in development or production
  baseURL: import.meta.env.PROD ? "/arbor/api" : "/api",
}

export function fetchName(name) {
  return function (dispatch) {
    axios
      .get("/person/" + name, axiosConfig)
      .then((json) => {
        dispatch(saveName(json.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export function fetchEvents() {
  return function (dispatch) {
    axios
      .get("/events", axiosConfig)
      .then((json) => {
        dispatch(saveEvents(json.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export function fetchResults(raceID) {
  return function (dispatch) {
    axios
      .get("/event/" + raceID, axiosConfig)
      .then((json) => {
        dispatch(saveResults(json.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export function fetchFight(name1, name2) {
  return function (dispatch) {
    axios
      .get("/fight/" + name1 + "/" + name2, axiosConfig)
      .then((json) => {
        dispatch(saveFightResults(json.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
