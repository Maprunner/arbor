import React from 'react';
import ChampionTable from './ChampionTable';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { selectEvent, fetchResults, selectName, fetchName } from './actions/actions.js';

const mapStateToProps = (state) => {
  return {
    champions: state.events.champions
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCellClicked: (event) => {
      const column = event.column.colId;
      if ((column === "M") || (column === "W")) {
        const name = (column === "M" ? event.data.M: event.data.W);
        // don't try to load names with ( which shows a club abbreviation for a relay
        // or / which shows a joint winner which we can't easily deal with
        // regex is "name doesn't match some characters followed by ( or /"
        if (!/.*[(|/]/.test(name)) {
          dispatch(selectName(name));
          dispatch(fetchName(name));
          dispatch(push('/person/' + name));
        }
      } else {
        const raceID = parseInt(event.data.RaceID, 10);
        dispatch(selectEvent(raceID));
        dispatch(fetchResults(raceID));
        dispatch(push('/event/' + raceID));
      }
    }
  }
}

const Champions = React.createClass({
  render: function() {
    return (
      <div>
        <ChampionTable
          champions={this.props.champions}
          onCellClicked={this.props.onCellClicked}
        />
      </div>
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Champions)
