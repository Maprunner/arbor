import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

class ClassFilter extends Component {
  onClickSingleClass(event) {
    this.props.onClassFilterUpdated([event.name]);
  }

  onClickAllClasses(event) {
    this.props.onClassFilterUpdated(this.props.classes);
  }

  render() {

    let classes = this.props.classes.map(function (name, index) {
      return (
        <Button
          className="m-1"
          variant="outline-secondary"
          onClick={this.onClickSingleClass.bind(this, { name })}
          key={index}
          size="sm"
        >
          {name}
        </Button>
      );
    }, this);

    return (
      <div>
        <ButtonToolbar>
          <Button
            className="m-1"
            variant="info"
            onClick={this.onClickAllClasses.bind(this, "All")}
            size="sm"
          >
            Show all
          </Button>
          {classes}
        </ButtonToolbar>
      </div>
    );
  }
}

ClassFilter.propTypes = {
  classes: PropTypes.array.isRequired,
  onClassFilterUpdated: PropTypes.func.isRequired
};

export default ClassFilter;
