import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import Page from './Page';
import Events from './Events';
import Person from './Person';
import Fight from './Fight';
import About from './About';
import SingleEvent from './SingleEvent';
import reducers from './reducers/reducers.js';
import { fetchEvents } from './actions/actions.js';

export const store = createStore(
  reducers, 
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory)
  )
);

const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(fetchEvents());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Page}>
        <IndexRoute component={Events}/>
        <Route path='person' component={Person}/>
        <Route path='person/(:name)' component={Person}/>
        <Route path='fight' component={Fight}/>
        <Route path='fight/(:name1)/(:name2)' component={Fight}/>
        <Route path='event/(:id)' component={SingleEvent}/>
        <Route path='about' component={About}/>
        <Route path='*' component={Events} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
