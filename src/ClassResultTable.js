import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import ClassFilter from './ClassFilter';
import '../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../node_modules/ag-grid/dist/styles/theme-fresh.css';

class ClassResultTable extends Component {

  formatPosition(params) {
    return parseInt(params.value, 10) === 999 ? "-" : params.value;
  }

  render(props) {
const columnDefs = [
  {headerName: 'Class', field: 'Class', width: 100, cellClass: "center-text"},
  {headerName: 'Position', field: 'Position', width: 100, cellClass: "center-text", cellRenderer: this.formatPosition},
  {headerName: 'Name', field: 'Name', width: 200},
  {headerName: 'Club', field: 'Club', width: 100, cellClass: "center-text"},
  {headerName: 'Time', field: 'Time', width: 100, cellClass: "center-text"},
];
    
    
		return (
      <div>
        <div style={{marginBottom: "20px"}}>
          <ClassFilter
            classes={this.props.classData}
            onClassFilterUpdated={this.props.onClassFilterUpdated}
          />
        </div>
        <div style={{height: "600px"}}>
          <AgGridReact
            rowData={this.props.resultData}
            onRowClicked={this.props.onNameSelected}
		        columnDefs={columnDefs}
            enableSorting="true"
            enableFilter="true"
		      />
        </div>
      </div>
    );
  }
}

ClassResultTable.propTypes = {
  resultData: React.PropTypes.array.isRequired,
  classData: React.PropTypes.array.isRequired,
  onNameSelected: React.PropTypes.func.isRequired,
  onClassFilterUpdated: React.PropTypes.func.isRequired
};

export default ClassResultTable;
