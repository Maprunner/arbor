import React from 'react';
import { connect } from 'react-redux';
import EventSummaryTable from './EventSummaryTable';
import ClassResultTable from './ClassResultTable';
import { selectEvent, fetchName, selectName, fetchResults, filterClasses } from './actions/actions.js';
import DocumentTitle from 'react-document-title';
import { getEventAbbreviation } from './utils.js';

const mapStateToProps = (state) => {
  return {
    currentEventDetails: state.events.currentEventDetails,
    currentRaceID: state.events.currentRaceID,
    resultData: state.results.results,
    filteredClasses: state.results.filteredClasses,
    classData: state.results.classes
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameSelected: (event) => {
      const name = event.node.data.Name;
      dispatch(selectName(name));
      dispatch(fetchName(name));
      //dispatch(push('/person/' + name));
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

class SingleEvent extends React.Component {
  componentDidMount() {
    if (this.props.currentRaceID === null) {
      // deep link to a particular event that needs to be loaded
      // location.pathname is e.g. '/event/123'
      const index = this.props.location.pathname.lastIndexOf('/');
      const raceID = this.props.location.pathname.substr(index + 1, this.props.location.pathname.length - index);
      this.props.handleDeepLink(parseInt(raceID, 10));
    }
  }

  classIsDisplayed(result) {
    return this.props.filteredClasses.indexOf(result.Class) === -1 ? false : true;
  }

  filterResults() {
    const filtered = this.props.resultData.filter(this.classIsDisplayed);
    return filtered;
  }

  render() {
    const title = (getEventAbbreviation(this.props.currentEventDetails) || "Arbor | Event results");
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">Event Summary</div>
            <div className="panel-body ag-theme-fresh">
              <DocumentTitle title={title}>
                <EventSummaryTable
                  rowData={this.props.currentEventDetails}
                />
              </DocumentTitle>
            </div>
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">Results</div>
            <div className="panel-body ag-theme-fresh">
              <ClassResultTable
                resultData={this.filterResults()}
                classData={this.props.classData}
                onNameSelected={this.props.onNameSelected}
                onClassFilterUpdated={this.props.onClassFilterUpdated}
                rowSelection='single'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEvent)
