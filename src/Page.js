import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import Events from './Events';
import Champions from './Champions';
import Person from './Person';
import Fight from './Fight';
import AboutPage from './AboutPage';
import SingleEvent from './SingleEvent';
import './Arbor.css';

const Page = () => (
  <div>
    <NavigationBar />
    <div className="container">
      <Switch>
        <Route exact path="/" component={Events} />
        <Route path='/person/:name?' component={Person} />
        <Route path='/person' component={Person} />
        <Route path='/fight/:name1?/:name2?' component={Fight} />
        <Route path='/fight' component={Fight} />
        <Route path='/event/:id' component={SingleEvent} />
        <Route path='/about' component={AboutPage} />
        <Route path='/champions' component={Champions} />
        <Route component={Events} />
      </Switch>
    </div>
    <Footer />
  </div>
)
export default Page;
