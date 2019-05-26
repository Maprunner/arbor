import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import { axiosConfig } from './actions/actions.js';

class FightSearch extends React.Component {
  state = {
    options: [],
    name1: null,
    name2: null
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Card>
            <Card.Header className="bg-arbor text-white">{this.props.caption}</Card.Header>
            <Card.Body className="ag-theme-fresh" style={{ height: "50px", marginBottom: "10px" }}>
              <AsyncTypeahead
                ref="nameTypeAhead"
                labelKey="Name"
                onSearch={this.handleSearch}
                onChange={this.handleInput}
                options={this.state.options}
                placeholder="Name 1..."
                caseSensitive={false}
                minLength={3}
                renderMenuItemChildren={(option, props, index) => (
                  <div><span>{option.Name}</span></div>
                )}
              />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <Card.Header className="bg-arbor text-white">{this.props.caption}</Card.Header>
            <Card.Body className="ag-theme-fresh" style={{ height: "50px", marginBottom: "10px" }}>
              <AsyncTypeahead
                ref="nameTypeAhead"
                labelKey="Name"
                onSearch={this.handleSearch}
                onChange={this.handleInput}
                options={this.state.options}
                placeholder="Name 2..."
                caseSensitive={false}
                minLength={3}
                renderMenuItemChildren={(option, props, index) => (
                  <div><span>{option.Name}</span></div>
                )}
              />
            </Card.Body>
          </Card>
        </div>
      </div >
    );
  }

  handleSearch(query) {
    // know we have at least 3 characters because of minLength property
    axios.get('/namesearch/' + query, axiosConfig)
      .then(json => {
        this.setState({ options: json.data });
      });
  }

  handleInput(input) {
    // triggered when item selected from typeahead dropdown list
    if (input.length > 0) {
      this.props.onFightSelected(input[0].Name);
    }
  }
}

NameSearch.propTypes = {
  onFightSelected: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired
};

export default FightSearch;
