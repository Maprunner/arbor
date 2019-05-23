import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import './css/ag-grid.css';
import './css/ag-theme-fresh.css';
import { formatLink } from './utils.js';

class EventsTable extends Component {

  render() {
    const columnDefs = [
      { headerName: 'RaceID', field: 'RaceID', hide: 'true' },
      { headerName: 'Event', field: 'Event', width: 100, sortable: true },
      { headerName: 'Year', field: 'Year', width: 75, cellClass: "center-text", sortable: true },
      { headerName: 'Date', field: 'Date', width: 100, cellClass: "center-text" },
      { headerName: 'Club', field: 'Club', width: 100, cellClass: "center-text" },
      { headerName: 'Classes', field: 'Classes', width: 100, cellClass: "center-text" },
      { headerName: 'Runners', field: 'Runners', width: 100, cellClass: "center-text" },
      { headerName: 'Area', field: 'Area', width: 250, cellRenderer: this.formatArea },
      { headerName: 'Link', field: 'Link', width: 75, cellRenderer: formatLink },
      { headerName: 'Assoc', field: 'Association', width: 100, cellClass: "center-text" }
    ];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">All Events</div>
            <div className="panel-body ag-theme-fresh" style={{ height: "400px" }}>
              <AgGridReact
                onGridReady={this.onGridReady.bind(this)}
                onRowSelected={this.props.onRowSelected}
                rowData={this.props.events}
                columnDefs={columnDefs}
                rowSelection="single"
              />
            </div>
          </div>
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
