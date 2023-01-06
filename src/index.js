import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import Page from "./Page"
import reducers from "./reducers/reducers.js"
import { fetchEvents } from "./actions/actions.js"

export const store = configureStore({
  reducer: reducers,
})

store.dispatch(fetchEvents())

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/arbor">
        <Page />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
