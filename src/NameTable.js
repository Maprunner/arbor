import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import '../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../node_modules/ag-grid/dist/styles/theme-fresh.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Badge } from 'react-bootstrap';

class NameTable extends Component {
  formatPosition(params) {
    return parseInt(params.value, 10) === 999 ? "-" : params.value;
  }
  
  countEntries(eventName) {
    const count = this.props.results.reduce(function(total, event) {
      return event.Event === eventName ? total + 1: total;
    }, 0);
    return count;
  }
  
  render() {
    const columnDefs = [
    {headerName: 'RaceID', field: 'RaceID', hide: 'true'},
    {headerName: 'Event', field: 'Event', width: 100},
    {headerName: 'Year', field: 'Year', width: 75, cellClass: "center-text"},
    {headerName: 'Area', field: 'Area', width: 250},
    {headerName: 'Class', field: 'Class', width: 100, cellClass: "center-text"},
    {headerName: 'Position', field: 'Position', width: 100, cellClass: "center-text", cellRenderer: this.formatPosition},
    {headerName: 'Name', field: 'Name', width: 200},
    {headerName: 'Club', field: 'Club', width: 100, cellClass: "center-text"},
    {headerName: 'Time', field: 'Time', width: 100, cellClass: "center-text"},
    ];
    let info;
    if (this.props.results.length === 0) {
      info = "Results";
    } else {
      info = "Results for " + this.props.name;
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
            {info}
            <Badge>Total {this.props.results.length}</Badge>
            <Badge>BOC {this.countEntries("British Long")}</Badge>
            <Badge>BSC {this.countEntries("British Sprint")}</Badge>
            <Badge>BMC {this.countEntries("British Middle")}</Badge>
            <Badge>BNC {this.countEntries("British Night")}</Badge>
            <Badge>JKD1 {this.countEntries("JK Day 1")}</Badge>
            <Badge>JKD2 {this.countEntries("JK Day 2")}</Badge>
            <Badge>JKS {this.countEntries("JK Sprint")}</Badge>
            </div>
            <div className="panel-body ag-fresh" style={{height: "400px"}}>
              <AgGridReact
                onGridReady={this.onGridReady.bind(this)}
                onRowSelected={this.props.onRowSelected}
                rowData={this.props.results}
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

NameTable.propTypes = {
  onRowSelected: React.PropTypes.func.isRequired,
  results: React.PropTypes.array.isRequired,
  name: React.PropTypes.string
};

export default NameTable;
