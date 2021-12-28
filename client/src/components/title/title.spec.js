import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from './index';

test('Title should render text passed by props', () => {
  render(<Title {...{title: 'Foo', subtitle: 'Bar'}} />);
  expect(screen.getByText('Foo')).toBeInTheDocument();
  expect(screen.getByText('Bar')).toBeInTheDocument();
});
