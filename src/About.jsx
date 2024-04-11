import React from "react"
import "./Arbor.css"

const About = () => (
  <div>
    <h1>About</h1>
    <p>
      The Maprunner Archive of British Orienteering Records (Arbor) includes
      results from all major British events dating back to around 2000.
    </p>
    <p>
      The back end is written using the{" "}
      <a href="https://fatfreeframework.com/3.6/home">Fat-Free php framework</a>{" "}
      with a SQLite database.
    </p>
    <span>
      The front end is built using:
      <ul>
        <li>
          <a href="https://facebook.github.io/react/">React</a>
        </li>
        <li>
          <a href="https://github.com/reactjs/react-redux">React-redux</a>
        </li>
        <li>
          <a href="https://github.com/ReactTraining/react-router">
            React-router
          </a>
        </li>
        <li>
          <a href="http://getbootstrap.com/">Bootstrap</a>
        </li>
        <li>
          <a href="https://react-bootstrap.github.io/">React Bootstrap</a>
        </li>
        <li>
          <a href="https://github.com/mzabriskie/axios">axios</a>
        </li>
        <li>
          <a href="https://www.ag-grid.com/">ag-grid</a>
        </li>
        <li>
          <a href="https://vitejs.dev/">Vite</a>
        </li>
      </ul>
    </span>
    <p>
      Arbor was written by{" "}
      <a href="https://www.maprunner.co.uk/simon/">Simon Errington</a>. The
      source code is available from{" "}
      <a href="https://github.com/Maprunner/arbor">Github</a>.
    </p>
  </div>
)

export default About
