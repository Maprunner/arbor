import React, { Component } from 'react';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Arbor.css';
import pic from './img/arborbanner.jpg';

class NavBar extends Component {
  render() {

    return (
<div>
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#arbor-navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="arbor-navbar">
        <ul className="nav navbar-nav">
          <li><Link to="/">All events</Link></li>
          <li><Link to="/person">Name search</Link></li>
          <li><Link to="/fight">Fight!</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </div>
  </nav>
  <div className="container">
    <div className="row">
      <img className="arbor-logo" src={pic} alt="Arbor logo" title="Arbor logo"></img>
    </div>
  </div>
</div>
    );
  }
}

export default NavBar;
