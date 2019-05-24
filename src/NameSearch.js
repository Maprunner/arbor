import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import { axiosConfig } from './actions/actions.js';

class NameSearch extends React.Component {
  state = {
    options: [],
    isLoading: false
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Card>
            <Card.Header>{this.props.caption}</Card.Header>
            <Card.Body className="ag-theme-fresh" style={{ height: "50px", marginBottom: "10px" }}>
              <AsyncTypeahead
                {...this.state}
                ref="nameTypeAhead"
                id="name-search"
                labelKey="Name"
                onSearch={this.handleSearch}
                onChange={this.handleInput}
                {...this.state}
                placeholder="Name search..."
                caseSensitive={false}
                minLength={3}
                renderMenuItemChildren={(option, props, index) => (
                  <div><span>{option.Name}</span></div>
                )}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  handleSearch(query) {
    // know we have at least 3 characters because of minLength property
    this.setState({ isLoading: true });
    axios.get('/namesearch/' + query, axiosConfig)
      .then(json => {
        this.setState({ options: json.data, isLoading: false });
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
