import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { Card } from 'react-bootstrap';
import './css/ag-grid.css';
import './css/ag-theme-fresh.css';

const columnDefs = [
  { headerName: 'RaceID', field: 'RaceID', hide: 'true' },
  { headerName: 'Event', field: 'Event', width: 120 },
  { headerName: 'Year', field: 'Year', width: 75, cellClass: "center-text" },
  { headerName: 'Area', field: 'Area', width: 225 },
  { headerName: 'Assoc', field: 'Association', width: 75, cellClass: "center-text" },
  { headerName: 'Men', field: 'M', width: 275 },
  { headerName: 'Women', field: 'W', width: 275 }
];

const defaultColDef = {
  sortable: true,
  filter: true,
};

class ChampionTable extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Card className="mb-3">
            <Card.Header className="bg-arbor text-white">Champions</Card.Header>
            <Card.Body className="ag-theme-fresh" style={{ height: "400px" }}>
              <AgGridReact
                rowData={this.props.champions}
                onCellClicked={this.props.onCellClicked}
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
}

ChampionTable.propTypes = {
  onCellClicked: PropTypes.func.isRequired,
  champions: PropTypes.array.isRequired
};

export default ChampionTable;
