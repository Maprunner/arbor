import React from 'react';
import PropTypes from 'prop-types';
import EventSummaryTable from './EventSummaryTable';
import ClassResultTable from './ClassResultTable';
import { Card } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { getEventAbbreviation } from './utils.js';

class SingleEventTable extends React.Component {
  componentDidMount() {
    if (this.props.currentRaceID === null) {
      // deep link to a particular event that needs to be loaded
      // location.pathname is e.g. '/event/123'
      const index = this.props.location.pathname.lastIndexOf('/');
      const raceID = this.props.location.pathname.substr(index + 1, this.props.location.pathname.length - index);
      this.props.handleDeepLink(parseInt(raceID, 10));
    }
  }

  render() {
    const title = (getEventAbbreviation(this.props.currentEventDetails) || "Arbor | Event results");
    return (
      <div className="row">
        <div className="col-md-12">
          <Card className="mb-3">
            <Card.Header className="bg-arbor text-white">Event Summary</Card.Header>
            <Card.Body className="ag-theme-fresh">
              <DocumentTitle title={title}>
                <EventSummaryTable
                  rowData={this.props.currentEventDetails}
                />
              </DocumentTitle>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Header className="bg-arbor text-white">Results</Card.Header>
            <Card.Body className="ag-theme-fresh">
              <ClassResultTable
                resultData={this.props.resultData}
                // resultData={this.filterResults()}
                classData={this.props.classData}
                onNameSelected={this.props.onNameSelected}
                onClassFilterUpdated={this.props.onClassFilterUpdated}
                rowSelection='single'
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

SingleEventTable.propTypes = {
  currentEventDetails: PropTypes.array.isRequired,
  currentRaceID: PropTypes.number,
  resultData: PropTypes.array.isRequired,
  filteredClasses: PropTypes.array.isRequired,
  classData: PropTypes.array.isRequired
};

export default SingleEventTable;
