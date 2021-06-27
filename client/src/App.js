import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Heading} from '@chakra-ui/react';
import NavigationBar from './components/nav/index';
import Footer from './components/footer/index';
import HomePage from './pages/home';
export default function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/test' exact>
            <Heading size='md'>Test path</Heading>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
