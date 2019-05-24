import React from 'react';
import EventsTable from './EventsTable';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { selectEvent, fetchResults } from './actions/actions.js';

const mapStateToProps = (state) => {
  return {
    events: state.events.eventData
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRowSelected: (event) => {
      const raceID = event.node.data.RaceID;
      dispatch(selectEvent(raceID));
      dispatch(fetchResults(raceID));
      ownProps.history.push('/event/' + raceID);
    }
  }
}

class Events extends React.Component {
  render() {
    return <EventsTable
      events={this.props.events}
      onRowSelected={this.props.onRowSelected}
    />;
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Events))
