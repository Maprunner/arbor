import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Button, ButtonToolbar } from 'react-bootstrap';

class ClassFilter extends Component {
  onClickSingleClass(event) {
    this.props.onClassFilterUpdated([event.name]);
  }

  onClickAllClasses(event) {
    this.props.onClassFilterUpdated(this.props.classes);
  }

  render() {
    
    let classes = this.props.classes.map(function(name, index) {
      return(
        <Button 
          bsStyle="default"
          onClick={this.onClickSingleClass.bind(this, {name})}
          key={index}
          className="btn btn-default">{name}</Button>
      );
    }, this);
		
    return (
      <div>
        <ButtonToolbar>
          {classes}
          <Button 
            bsStyle="success"
            onClick={this.onClickAllClasses.bind(this, "All")}
            className="btn btn-default">Show all
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

ClassFilter.propTypes = {
  classes: React.PropTypes.array.isRequired,
  onClassFilterUpdated: React.PropTypes.func.isRequired
};

export default ClassFilter;
