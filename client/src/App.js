import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import NavigationBar from './components/nav/index';
import Footer from './components/footer/index';
import Routes from './components/routes/index.js';

export default function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Routes />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
