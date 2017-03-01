import React from 'react';
import NameTable from './NameTable';
import NameSearch from './NameSearch';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DocumentTitle from 'react-document-title';
import { selectEvent, fetchResults, selectName, fetchName } from './actions/actions.js';

const mapStateToProps = (state) => {
  return {
    name: state.name.name,
    results: state.name.results
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRowSelected: (event) => {
      const raceID = parseInt(event.node.data.RaceID, 10);
      dispatch(selectEvent(raceID));
      dispatch(fetchResults(raceID));
      dispatch(push('/event/' + raceID));
    },
    onNameSelected: (name, doPush = true) => {
      dispatch(selectName(name));
      dispatch(fetchName(name));
      if (doPush) {
        dispatch(push('/person/' + name));
      }
    }
  }
}

const Person = React.createClass({
  componentDidMount () {
    if (this.props.name === null) {
      // check for deep link to a particular name that needs to be loaded
      // location.pathname is e.g. '/person/Simon%20Errington'
      const bits = this.props.location.pathname.split("/");
      if (bits.length === 3) {
        const name = bits[2].replace("%20", " ");
        this.props.onNameSelected(name, false);
      }
    }
  },  
  
  render: function() {
    const title = (this.props.name || " Arbor | Name search");
    return (
      <div>
        <DocumentTitle title={title}>
          <NameSearch 
            onNameSelected={this.props.onNameSelected}
            caption="Name search"
          />
        </DocumentTitle>
        <NameTable
          name={this.props.name}
          results={this.props.results}
          onRowSelected={this.props.onRowSelected}
        />
      </div>
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Person)
