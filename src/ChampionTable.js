import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import '../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../node_modules/ag-grid/dist/styles/theme-fresh.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const columnDefs = [
  {headerName: 'RaceID', field: 'RaceID', hide: 'true'},
  {headerName: 'Event', field: 'Event', width: 100},
  {headerName: 'Year', field: 'Year', width: 100, cellClass: "center-text"},
  {headerName: 'Area', field: 'Area', width: 225},
  {headerName: 'Assoc', field: 'Association', width: 100, cellClass: "center-text"},
  {headerName: 'Men', field: 'M', width: 275},
  {headerName: 'Women', field: 'W', width: 275}
];

class ChampionTable extends Component {
  render() {
		return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">Champions</div>
            <div className="panel-body ag-fresh" style={{height: "400px"}}>
              <AgGridReact
                rowData={this.props.champions}
                onCellClicked={this.props.onCellClicked}
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
}

ChampionTable.propTypes = {
  onCellClicked: React.PropTypes.func.isRequired,
  champions: React.PropTypes.array.isRequired
};

export default ChampionTable;
