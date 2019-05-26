import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Arbor.css';
import pic from './img/arborbanner.jpg';

class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-0">
          >
      <div className="container">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto" activeKey={this.props.location.pathname}>
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
              <Nav activeKey={this.props.location.pathname}>
                <LinkContainer to='/about'>
                  <Nav.Link eventKey={1}>About</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        <div className="container">
          <div className="row" style={{display: "block"}}>
            <img className="arbor-logo" src={pic} alt="Arbor logo" title="Arbor logo"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NavigationBar);
