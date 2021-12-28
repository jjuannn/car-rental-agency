import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './index';

test('Renders Loading corectly', () => {
  render(<Loading />);
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});
