import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from './index';
import {BrowserRouter as Router, Route} from 'react-router-dom';

/** VER ESTO CON MAS DETALLE DESPUES
 * https://testing-library.com/docs/example-react-router/
 *
 */

test('Nav renders correctly', () => {
  render(
    <Router>
      <Nav />
    </Router>
  );
  const $homeButton = screen.getByTestId('home-button-link');
  expect($homeButton).toBeInTheDocument();
  expect($homeButton).toHaveTextContent('Rental Agency');
  expect($homeButton).toHaveAttribute('href', '/');

  const $menuList = screen.getByTestId('menu-list');
  expect($menuList).toBeInTheDocument();
  expect($menuList.childElementCount).toBe(3);

  const $carItem = screen.getByTestId('menu-item-cars');

  expect($carItem).toBeInTheDocument();
  expect($carItem).toHaveAttribute('href', '/car/list');
  expect($carItem).toHaveTextContent('Cars');

  const $clientItem = screen.getByTestId('menu-item-clients');
  expect($clientItem).toBeInTheDocument();
  expect($clientItem).toHaveAttribute('href', '/client/list');
  expect($clientItem).toHaveTextContent('Clients');

  const $rentalItem = screen.getByTestId('menu-item-rentals');
  expect($rentalItem).toBeInTheDocument();
  expect($rentalItem).toHaveAttribute('href', '/rental/list');
  expect($rentalItem).toHaveTextContent('Rentals');
});
