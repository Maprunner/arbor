import React from 'react';
import ReactDOM from 'react-dom';
//import { createHistory } from 'history'
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
//import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import Page from './Page';
import reducers from './reducers/reducers.js';
import { fetchEvents } from './actions/actions.js';


// const browserHistory = useRouterHistory(createHistory)({
//   basename: '/arbor'
// })

export const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
    //routerMiddleware(browserHistory)
  )
)

//const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(fetchEvents());

ReactDOM.render(
  <DocumentTitle title='Arbor'>
    <Provider store={store}>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </Provider>
  </DocumentTitle>,
  document.getElementById('root')
);
