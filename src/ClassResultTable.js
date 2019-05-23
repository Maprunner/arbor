import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import ClassFilter from './ClassFilter';
import './css/ag-grid.css';
import './css/ag-theme-fresh.css';
import { formatPosition } from './utils.js';

class ClassResultTable extends Component {

  render(props) {
    const columnDefs = [
      { headerName: 'Class', field: 'Class', width: 100, cellClass: "center-text" },
      { headerName: 'Position', field: 'Position', width: 100, cellClass: "center-text", cellRenderer: formatPosition },
      { headerName: 'Name', field: 'Name', width: 200 },
      { headerName: 'Club', field: 'Club', width: 100, cellClass: "center-text" },
      { headerName: 'Time', field: 'Time', width: 100, cellClass: "center-text" },
    ];


    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <ClassFilter
            classes={this.props.classData}
            onClassFilterUpdated={this.props.onClassFilterUpdated}
          />
        </div>
        <div style={{ height: "600px" }}>
          <AgGridReact
            rowData={this.props.resultData}
            onRowClicked={this.props.onNameSelected}
            columnDefs={columnDefs}
          />
        </div>
      </div>
    );
  }
}

ClassResultTable.propTypes = {
  resultData: PropTypes.array.isRequired,
  classData: PropTypes.array.isRequired,
  onNameSelected: PropTypes.func.isRequired,
  onClassFilterUpdated: PropTypes.func.isRequired
};

export default ClassResultTable;
