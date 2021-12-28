import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import StatCard from './index';

test('StatCard should render text passed by props', () => {
  const statProps = {
    type: 'Car',
    lastMonthNumber: '30',
    lastMonthPercent: '25',
    total: '200'
  };
  render(<StatCard {...statProps} />);

  const $lastMonthNumber = screen.getByTestId('last-month-number');
  expect($lastMonthNumber).toBeInTheDocument();
  expect($lastMonthNumber).toHaveTextContent(
    `${statProps.type} - ${statProps.lastMonthNumber} last month`
  );

  const $totalNumber = screen.getByTestId('total-number');
  expect($totalNumber).toBeInTheDocument();
  expect($totalNumber).toHaveTextContent(`${statProps.total} ${statProps.type}`);

  const $lastMonthPercent = screen.getByTestId('last-month-percent');
  expect($lastMonthPercent).toBeInTheDocument();
  expect($lastMonthPercent).toHaveTextContent(`${statProps.lastMonthPercent}% since last month`);
});
