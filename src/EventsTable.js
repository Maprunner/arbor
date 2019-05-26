import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { Card } from 'react-bootstrap';
import './css/ag-grid.css';
import './css/ag-theme-fresh.css';
import { formatLink } from './utils.js';

class EventsTable extends Component {

  render() {
    const columnDefs = [
      { headerName: 'RaceID', field: 'RaceID', hide: 'true' },
      { headerName: 'Event', field: 'Event', width: 100 },
      { headerName: 'Year', field: 'Year', width: 75, cellClass: "center-text" },
      { headerName: 'Date', field: 'Date', width: 100, cellClass: "center-text" },
      { headerName: 'Club', field: 'Club', width: 100, cellClass: "center-text" },
      { headerName: 'Classes', field: 'Classes', width: 100, cellClass: "center-text" },
      { headerName: 'Runners', field: 'Runners', width: 100, cellClass: "center-text" },
      { headerName: 'Area', field: 'Area', width: 250, cellRenderer: this.formatArea },
      { headerName: 'Link', field: 'Link', width: 75, cellRenderer: formatLink, filter: false, sortable: false },
      { headerName: 'Assoc', field: 'Association', width: 100, cellClass: "center-text" }
    ];

    const defaultColDef = {
      sortable: true,
      filter: true,
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <Card className="mb-3">
            <Card.Header className="bg-arbor text-white">All Events</Card.Header>
            <Card.Body className="ag-theme-fresh" style={{ height: "400px" }}>
              <AgGridReact
                onGridReady={this.onGridReady.bind(this)}
                onRowSelected={this.props.onRowSelected}
                rowData={this.props.events}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection="single"
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  onGridReady(props) {
    props.api.sizeColumnsToFit();
  }
}

EventsTable.propTypes = {
  onRowSelected: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

export default EventsTable;
