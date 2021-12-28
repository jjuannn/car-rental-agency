import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './index';

test('ErrorMessage renders with text passed by prop', () => {
  const errorText = {message: 'Foo'};
  render(<ErrorMessage {...errorText} />);
  const $errorMessage = screen.getByTestId('error-message');
  expect($errorMessage).toBeInTheDocument();
  expect($errorMessage).toHaveTextContent('Foo');
});
