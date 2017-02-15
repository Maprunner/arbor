import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Arbor.css';

class Page extends Component {

  render() {
		return (
      <div>
        <NavBar />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Page;
