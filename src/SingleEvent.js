import { connect } from 'react-redux';
import { withRouter } from "react-router";
import SingleEventTable from './SingleEventTable';
import { selectEvent, fetchName, selectName, fetchResults, filterClasses } from './actions/actions.js';

const mapStateToProps = (state) => {
  return {
    currentEventDetails: state.events.currentEventDetails,
    currentRaceID: state.events.currentRaceID,
    resultData: state.results.results.filter(function (result) { return state.results.filteredClasses.indexOf(result.Class) !== -1; }),
    filteredClasses: state.results.filteredClasses,
    classData: state.results.classes
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNameSelected: (event) => {
      const name = event.node.data.Name;
      dispatch(selectName(name));
      dispatch(fetchName(name));
      ownProps.history.push('/person/' + name);
    },
    onClassFilterUpdated: (newFilter) => {
      dispatch(filterClasses(newFilter));
    },
    handleDeepLink: (raceID) => {
      dispatch(selectEvent(raceID));
      dispatch(fetchResults(raceID));
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEventTable))
