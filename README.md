# Maprunner Archive of British Orienteering Records (Arbor)

The [Maprunner Archive of British Orienteering Records](https://www.maprunner.co.uk/arbor) (Arbor) includes results from all major British orienteering events dating back to around 2000. 

In May 2021 it contains 136 events with over 190,000 individual results.

The back end is written using the [Fat-Free php framework](https://fatfreeframework.com/3.6/home) with a SQLite database.

The front end is based on [Create React App](https://github.com/facebookincubator/create-react-app) and uses amongst other things:

* [React](https://facebook.github.io/react/)
* [React-redux](https://github.com/reactjs/react-redux)
* [React-router](https://github.com/ReactTraining/react-router)
* [Bootstrap](http://getbootstrap.com/)
* [axios](https://github.com/mzabriskie/axios)
* [ag-grid](https://www.ag-grid.com/)
* [ag-grid-react](https://github.com/ceolter/ag-grid-react)

See the Wiki for details of how to import results for new events (in case I forget).

## Create-react-app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You need to be running XAMPP (or some other Apache server) as well to service API calls which get proxied to http://localhost:80 in package.json.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

