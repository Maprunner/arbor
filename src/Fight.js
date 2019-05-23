import React from 'react';
import FightTable from './FightTable';
import NameSearch from './NameSearch';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { selectFightNames, fetchFight } from './actions/actions.js';

const mapStateToProps = (state) => {
  return {
    name1: state.fight.name1,
    name2: state.fight.name2,
    results: state.fight.results
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onFightSelected: (name1, name2, doPush = true) => {
      dispatch(fetchFight(name1, name2));
      if (doPush) {
        //dispatch(push('/fight/' + name1 + "/" + name2));
      }
    }
  }
}

class Fight extends React.Component {
  componentDidMount() {
    if ((this.props.name1 === null) && (this.props.name2 === null)) {
      // check for deep link to a particular fight that needs to be loaded
      // location.pathname is e.g. '/fight/Simon%20Errington/Helen%20Errington'
      const bits = this.props.location.pathname.split("/");
      if (bits.length === 4) {
        const name1 = bits[2].replace("%20", " ");
        const name2 = bits[3].replace("%20", " ");
        this.props.dispatch(selectFightNames(name1, name2));
        this.props.onFightSelected(name1, name2, false);
      }
    }
  }

  onName1Selected(name1) {
    this.props.dispatch(selectFightNames(name1, this.props.name2));
    if (this.props.name2 !== null) {
      this.props.onFightSelected(name1, this.props.name2);
    }
  }

  onName2Selected(name2) {
    this.props.dispatch(selectFightNames(this.props.name1, name2));
    if (this.props.name1 !== null) {
      this.props.onFightSelected(this.props.name1, name2);
    }
  }

  render() {
    return (
      <div>
        <DocumentTitle title="Arbor | Fight">
          <NameSearch
            onNameSelected={this.onName1Selected}
            caption="Runner 1"
          />
        </DocumentTitle>
        <NameSearch
          onNameSelected={this.onName2Selected}
          caption="Runner 2"
        />
        <FightTable
          name1={this.props.name1}
          name2={this.props.name2}
          results={this.props.results}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fight)

