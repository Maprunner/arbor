import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import '../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../node_modules/ag-grid/dist/styles/theme-fresh.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { formatLink } from './utils.js';

class EventsTable extends Component {

  render() {
const columnDefs = [
  {headerName: 'RaceID', field: 'RaceID', hide: 'true'},
  {headerName: 'Event', field: 'Event', width: 100},
  {headerName: 'Year', field: 'Year', width: 75, cellClass: "center-text"},
  {headerName: 'Date', field: 'Date', width: 100, cellClass: "center-text"},
  {headerName: 'Club', field: 'Club', width: 100, cellClass: "center-text"},
  {headerName: 'Classes', field: 'Classes', width: 100, cellClass: "center-text"},
  {headerName: 'Runners', field: 'Runners', width: 100, cellClass: "center-text"},
  {headerName: 'Area', field: 'Area', width: 250, cellRenderer: this.formatArea},
  {headerName: 'Link', field: 'Link', width: 75, cellRenderer: formatLink},
  {headerName: 'Assoc', field: 'Association', width: 100, cellClass: "center-text"}
];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">All Events</div>
            <div className="panel-body ag-fresh" style={{height: "400px"}}>
              <AgGridReact
                onGridReady={this.onGridReady.bind(this)}
                onRowSelected={this.props.onRowSelected}
                rowData={this.props.events}
		            columnDefs={columnDefs}
                enableSorting="true"
                enableFilter="true"
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
  onRowSelected: React.PropTypes.func.isRequired,
  events: React.PropTypes.array.isRequired
};

export default EventsTable;
