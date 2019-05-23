import React from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import { axiosConfig } from './actions/actions.js';

class NameSearch extends React.Component {

  getInitialState() {
    return {
      options: [],
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">{this.props.caption}</div>
            <div className="panel-body ag-theme-fresh" style={{ height: "50px", marginBottom: "10px" }}>
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
  }

  handleSearch(query) {
    // know we have at least 3 characters because of minLength property
    axios.get('/namesearch/' + query, axiosConfig)
      .then(json => {
        this.setState({ options: json.data });
      });
  }

  handleInput(input) {
    // triggered when item selected from typeahead dropdown list, but user can
    // also edit it so need to check it is a valid name
    if (input.length > 0) {
      this.props.onNameSelected(input[0].Name);
    }
  }
}

NameSearch.propTypes = {
  onNameSelected: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired
};

export default NameSearch;
