# Maprunner Archive of British Orienteering Records (Arbor)

The [Maprunner Archive of British Orienteering Records](https://www.maprunner.co.uk/arbor) (Arbor) includes results from all major British orienteering events dating back to around 2000.

In April 2024 it contains 158 events with over 216,000 individual results.

The back end is written using the [Fat-Free php framework](https://fatfreeframework.com/3.6/home) with a SQLite database.

The front end is built using [Vite](https://vitejs.dev/guide/) and uses amongst other things:

- [React](https://facebook.github.io/react/)
- [React-redux](https://github.com/reactjs/react-redux)
- [React-router](https://github.com/ReactTraining/react-router)
- [Bootstrap](http://getbootstrap.com/)
- [axios](https://github.com/mzabriskie/axios)
- [ag-grid](https://www.ag-grid.com/)
- [ag-grid-react](https://github.com/ceolter/ag-grid-react)

See the Wiki for details of how to import results for new events (in case I forget).

## Available Scripts

In the project directory, you can run:

### `npm run start` or `npm run startdebug`

Runs the app in the development mode. Open [http://127.0.0.1:5173/arbor/](http://127.0.0.1:5173/arbor/) to view it in the browser.<br>

You need to be running XAMPP (or some other Apache server) as well to service API calls which get proxied to http://localhost/arbor in vite.config.mjs

### `npm run build`

Builds for production with output to the `dist` directory. Sync this directory to the server.<br>

At present this does not include the php back end. /api needs to be synced to the server separately
