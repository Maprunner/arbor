import React, { Component } from 'react';
//import { Link } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Arbor.css';
import pic from './img/arborbanner.jpg';

class NavBar extends Component {
  render() {

    // generates "Unknown prop `active` on <a> tag" warning when reloaded
    // see https://github.com/react-bootstrap/react-router-bootstrap/issues/185
    // live with this for now since you only see it in the console output
    return (
<div>
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to='/'>
          <a>All events</a>
        </LinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to='/champions'>
          <NavItem eventKey={1}>Champions</NavItem>
        </LinkContainer>
        <LinkContainer to='/person'>
          <NavItem eventKey={2}>Name search</NavItem>
        </LinkContainer>
        <LinkContainer to='/fight'>
          <NavItem eventKey={3}>Fight!</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to='/about'>
          <NavItem eventKey={1}>About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
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
