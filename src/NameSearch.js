import React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';
import { axiosConfig } from './actions/actions.js';

const NameSearch = React.createClass({
  
  getInitialState: function() {
    return {
      options: [],
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">{this.props.caption}</div>
            <div className="panel-body ag-fresh" style={{height: "50px", marginBottom: "10px"}}>
              <AsyncTypeahead
                ref="nameTypeAhead"
                labelKey="Name"
                onSearch={this.handleSearch}
                onChange={this.handleInput}
                options={this.state.options}
                placeholder="Name search..."
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
    // triggered when item selected from typeahead dropdown list, but user can
    // also edit it so need to check it is a valid name
    if (input.length > 0) {
      this.props.onNameSelected(input[0].Name);
    }
  }
})

NameSearch.propTypes = {
  onNameSelected: React.PropTypes.func.isRequired,
  caption: React.PropTypes.string.isRequired
};

export default NameSearch;
