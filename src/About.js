import React from 'react';
import './Arbor.css';

const About = ()=> (
<div>
<h1>About</h1>
<p>The Maprunner Archive of British Orienteering Records (Arbor) includes results from all major British events dating back to around 2000.
</p>
<p>
The back end is written using the <a href="https://fatfreeframework.com/3.6/home">Fat-Free php framework</a> with a SQLite database.
</p>
<span>
The front end is based on <a href="https://github.com/facebookincubator/create-react-app">Create React App</a> and uses:
  <ul>
    <li>React</li>
    <li>React-redux</li>
    <li>React-router</li>
    <li>React-redux</li>
    <li>React-router-redux</li>
    <li>axios</li>
    <li>ag-grid</li>
    <li>ag-grid-react</li>
  </ul>
</span>
<p>
Arbor was written by <a href="https://www.maprunner.co.uk/simon/">Simon Errington</a>. The source code is available from <a href="https://github.com/Maprunner/arbor">Github</a>.
</p>
</div>
);

export default About;
