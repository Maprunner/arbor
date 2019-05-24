import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Arbor.css';
import pic from './img/arborbanner.jpg';

const NavigationBar = () => (
  <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-0">
      >
      <div className="container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <LinkContainer to='/'>
              <Nav.Link eventKey={1}>All events</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/champions'>
              <Nav.Link eventKey={2}>Champions</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/person'>
              <Nav.Link eventKey={3}>Name search</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/fight'>
              <Nav.Link eventKey={4}>Fight!</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to='/about'>
              <Nav.Link eventKey={1}>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
    <div className="container">
      <div className="row">
        <img className="arbor-logo" src={pic} alt="Arbor logo" title="Arbor logo"></img>
      </div>
    </div>
  </div>
)

export default NavigationBar;
