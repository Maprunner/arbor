import React, { Component } from "react"
import EventsTable from "./EventsTable"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap-theme.css"
import axios from "axios"

const axiosConfig = {
  headers: { Accept: "application/json" },
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventData: [],
      raceData: [],
      classData: [],
      currentEventID: null,
      currentEventDetails: [],
      page: "All Events",
    }
  }

  componentDidMount() {
    const url = "arbor/api/events"
    axios.get(url, axiosConfig).then((json) => {
      this.setState({ eventData: json.data })
    })
  }

  onEventSelected(event) {
    const id = event.node.data.RaceID
    const eventDetailsIndex = this.state.eventData
      .map(function (x) {
        return parseInt(x.RaceID, 10)
      })
      .indexOf(id)
    this.setState({
      currentEventID: id,
      currentEventDetails: this.state.eventData[eventDetailsIndex],
      classData: [],
      raceData: [],
    })
    var url = "arbor/api/event/" + id
    axios.get(url, axiosConfig).then((json) => {
      const classes = [...new Set(json.data.map((x) => x.Class))]
      this.setState({
        raceData: json.data,
        classData: classes,
        page: "Event",
      })
    })
  }

  render(props) {
    let table
    switch (this.state.page) {
      case "All Events":
        table = this.renderAllEvents(props)
        break
      case "Event":
        table = this.renderSingleEvent(props)
        break
      default:
        table = "<div>No page defined.</div>"
    }

    return table
  }

  renderAllEvents(props) {
    return (
      <EventsTable
        onRowSelected={this.onEventSelected.bind(this)}
        rowData={this.state.eventData}
      />
    )
  }

  renderSingleEvent(props) {
    return (
      <SingleEventTable
        currentEventData={[this.state.currentEventDetails]}
        classData={this.state.classData}
        raceData={this.state.raceData}
      />
    )
  }
}

export default Table
