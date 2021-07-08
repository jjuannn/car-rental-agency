import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import HomePage from '../../pages/home';
import CarList from '../../pages/_car/list';
import ManageCar from '../../pages/_car/add';
import CarDetail from '../../pages/_car/view';
export default function AppRoutes() {
  return (
    <>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path='/car/list' exact>
        <CarList />
      </Route>
      <Route path='/car/add' exact>
        <ManageCar />
      </Route>
      <Route path='/car/view/id=:id' exact>
        <CarDetail />
      </Route>
      <Route path='/car/edit/id=:id' exact>
        <ManageCar />
      </Route>

      <Route path='/client/list' exact></Route>
      <Route path='/client/add' exact></Route>
      <Route path='/client/view/id=:id' exact></Route>
      <Route path='/client/edit/id=:id' exact></Route>

      <Route path='/rental/list' exact></Route>
      <Route path='/rental/add' exact></Route>
      <Route path='/rental/view/id=:id' exact></Route>
      <Route path='/rental/edit/id=:id' exact></Route>

      <Route path='/test' exact>
        <p>Test path</p>
      </Route>
    </>
  );
}
