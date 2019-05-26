import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import './css/ag-grid.css';
import './css/ag-theme-fresh.css';
import { formatLink } from './utils.js';

class EventSummaryTable extends Component {
  render() {
    const columnDefs = [
      { headerName: 'Event', field: 'Event', width: 125 },
      { headerName: 'Year', field: 'Year', width: 75, cellClass: "center-text" },
      { headerName: 'Date', field: 'Date', width: 125, cellClass: "center-text" },
      { headerName: 'Club', field: 'Club', width: 100, cellClass: "center-text" },
      { headerName: 'Classes', field: 'Classes', width: 100, cellClass: "center-text" },
      { headerName: 'Runners', field: 'Runners', width: 100, cellClass: "center-text" },
      { headerName: 'Area', field: 'Area', width: 300 },
      { headerName: 'Link', field: 'Link', width: 75, cellRenderer: formatLink },
      { headerName: 'Assoc', field: 'Association', width: 100, cellClass: "center-text" }
    ];
    return (
      <div style={{ height: "60px" }}>
        <AgGridReact
          rowData={this.props.rowData}
          onGridReady={this.onGridReady.bind(this)}
          columnDefs={columnDefs}
        />
      </div >
    );
  }

  onGridReady(props) {
    props.api.sizeColumnsToFit();
  }
}

EventSummaryTable.propTypes = {
  rowData: PropTypes.array.isRequired
};

export default EventSummaryTable;
