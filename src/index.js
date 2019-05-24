import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import thunkMiddleware from 'redux-thunk';
import Page from './Page';
import reducers from './reducers/reducers.js';
import { fetchEvents } from './actions/actions.js';

export const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware, ...getDefaultMiddleware()]
})

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
