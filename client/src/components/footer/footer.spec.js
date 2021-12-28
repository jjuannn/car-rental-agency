import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './index';

test('Renders Footer correctly', () => {
  expect(true).toBe(true);
  render(<Footer />);

  const $footer = screen.getByTestId('footer');
  expect($footer).toBeInTheDocument();
  expect($footer.textContent).toBe('Car Rental Agency made by Juan Avero');

  const $footerLink = screen.getByTestId('link');
  expect($footer).toBeInTheDocument();
  expect($footerLink).toHaveAttribute('href', 'https://github.com/jjuannn');
});
