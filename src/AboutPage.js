import React from 'react';
import DocumentTitle from 'react-document-title';
import About from './About';

class AboutPage extends React.Component {
  render() {
    return (
      <DocumentTitle title="Arbor | About">
        <About />
      </DocumentTitle>
    );
  }
}

export default AboutPage;
