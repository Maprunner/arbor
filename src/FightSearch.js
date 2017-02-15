import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';
import { axiosConfig } from './actions/actions.js';

const FightSearch = React.createClass({
  
  getInitialState: function() {
    return {
      options: [],
      name1: null,
      name2: null
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">{this.props.caption}</div>
            <div className="panel-body ag-fresh" style={{height: "50px", marginBottom: "10px"}}>
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
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">{this.props.caption}</div>
            <div className="panel-body ag-fresh" style={{height: "50px", marginBottom: "10px"}}>
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
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleSearch: function(query) {
    // know we have at least 3 characters because of minLength property
    axios.get('/namesearch/' + query, axiosConfig)
      .then(json => {
        this.setState({options: json.data});
    });
  },

  handleInput: function(input) {
    // triggered when item selected from typeahead dropdown list
    if (input.length > 0) {
      this.props.onFightSelected(input[0].Name);
    }
  }
})

NameSearch.propTypes = {
  onFightSelected: React.PropTypes.func.isRequired,
  caption: React.PropTypes.string.isRequired
};

export default FightSearch;
