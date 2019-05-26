import { connect } from 'react-redux';
import { withRouter } from "react-router";
import FightLayout from './FightLayout';
import { fetchFight, fetchResults, selectEvent } from './actions/actions.js';

const mapStateToProps = (state) => {
  return {
    name1: state.fight.name1,
    name2: state.fight.name2,
    results: state.fight.results
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    onFightSelected: (name1, name2, doPush = true) => {
      dispatch(fetchFight(name1, name2));
      if (doPush) {
        ownProps.history.push('/fight/' + name1 + "/" + name2);
      }
    },
    onFightRowSelected: (event) => {
      dispatch(selectEvent(event.data.RaceID));
      dispatch(fetchResults(event.data.RaceID));
      ownProps.history.push('/event/' + event.data.RaceID);
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FightLayout))

