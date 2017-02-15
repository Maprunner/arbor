import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import '../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../node_modules/ag-grid/dist/styles/theme-fresh.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Badge } from 'react-bootstrap';

class FightTable extends Component {
  formatPosition(params) {
    return parseInt(params.value, 10) === 999 ? "-" : params.value;
  }

  formatWinner1(params) {
    if (params.node.data.Position1 < params.node.data.Position2) {
      return '<strong>' + params.value + '</strong>';
    } else {
      return params.value;
    }
  }
  
  formatWinner2(params) {
    if (params.node.data.Position2 < params.node.data.Position1) {
      return '<strong>' + params.value + '</strong>';
    } else {
      return params.value;
    }
  }
  
  countEntries(eventName) {
    return this.props.results.reduce(function(total, event) {
      return event.Event === eventName ? total + 1: total;
    }, 0);
  }
  render() {
    const columnDefs = [
    {headerName: 'RaceID', field: 'RaceID', hide: 'true'},
    {headerName: 'Event', field: 'Event', width: 70},
    {headerName: 'Year', field: 'Year', width: 60, cellClass: "center-text"},
    {headerName: 'Area', field: 'Area', width: 200},
    {headerName: 'Class', field: 'Class', width: 75, cellClass: "center-text"},
    {headerName: 'Runner 1', field: 'Name1', width: 125, cellRenderer: this.formatWinner1},
    {headerName: 'Club', field: 'Club1', width: 75, cellClass: "center-text"},
    {headerName: 'Time', field: 'Time1', width: 75, cellClass: "center-text"},
    {headerName: 'Place', field: 'Position1', width: 65, cellClass: "center-text", cellRenderer: this.formatPosition},
    {headerName: 'Runner 2', field: 'Name2', width: 125, cellRenderer: this.formatWinner2},
    {headerName: 'Club', field: 'Club2', width: 75, cellClass: "center-text"},
    {headerName: 'Time', field: 'Time2', width: 75, cellClass: "center-text"},
    {headerName: 'Place', field: 'Position2', width: 65, cellClass: "center-text", cellRenderer: this.formatPosition},

    ];
    const info = "Fight: " + this.props.name1 + " v. " + this.props.name2;
    let r1Wins;
    if (this.props.results.length === 0) {
      r1Wins = 0;
    } else {
      r1Wins = this.props.results.reduce(function(wins, result) {
        return result.Position1 < result.Position2 ? wins + 1 : wins; 
      }, 0);
    }
    let r2Wins;
    if (this.props.results.length === 0) {
      r2Wins = 0;
    } else {
      r2Wins = this.props.results.reduce(function(wins, result) {
        return result.Position2 < result.Position1 ? wins + 1 : wins; 
      }, 0);
    }
    const draws = this.props.results.length - r1Wins - r2Wins;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
            {info}
            <Badge>Played {this.props.results.length}</Badge>
            <Badge>{this.props.name1} wins: {r1Wins}</Badge>
            <Badge>{this.props.name2} wins: {r2Wins}</Badge>
            <Badge>Draws: {draws}</Badge>
            </div>
            <div className="panel-body ag-fresh" style={{height: "500px"}}>
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

FightTable.propTypes = {
  results: React.PropTypes.array.isRequired,
  name1: React.PropTypes.string,
  name2: React.PropTypes.string
};

export default FightTable;
