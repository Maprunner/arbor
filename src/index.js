import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history'
import { Route, Router, IndexRoute, useRouterHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import Page from './Page';
import Events from './Events';
import Champions from './Champions';
import Person from './Person';
import Fight from './Fight';
import AboutPage from './AboutPage';
import SingleEvent from './SingleEvent';
import reducers from './reducers/reducers.js';
import { fetchEvents } from './actions/actions.js';


const browserHistory = useRouterHistory(createHistory)({
  basename: '/arbor'
})

export const store = createStore(
  reducers, 
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory)
  )
)

const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(fetchEvents());

ReactDOM.render(
<DocumentTitle title='Arbor'>
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Page}>
        <IndexRoute component={Events}/>
        <Route path='person' component={Person}/>
        <Route path='person/(:name)' component={Person}/>
        <Route path='fight' component={Fight}/>
        <Route path='fight/(:name1)/(:name2)' component={Fight}/>
        <Route path='event/(:id)' component={SingleEvent}/>
        <Route path='about' component={AboutPage}/>
        <Route path='champions' component={Champions}/>
        <Route path='*' component={Events} />
      </Route>
    </Router>
  </Provider>
</DocumentTitle>,
  document.getElementById('root')
);
