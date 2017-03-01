import React from 'react';
import DocumentTitle from 'react-document-title';
import About from './About';

const AboutPage = React.createClass({
  render: function() {
    return (
      <DocumentTitle title="Arbor | About">
        <About />
      </DocumentTitle>
    );
  }
})

export default AboutPage;
