import React from 'react';
import {Stat, StatLabel, StatNumber, StatHelpText, StatArrow} from '@chakra-ui/react';

interface IProps {
  type: string;
  lastMonthNumber: string;
  total: string;
  lastMonthPercent: string;
}

export default function StatCard({
  type,
  lastMonthNumber,
  total,
  lastMonthPercent
}: IProps): JSX.Element {
  return (
    <Stat
      border='1px'
      borderColor='gray.100'
      boxShadow='base'
      maxWidth='400px'
      margin='10px'
      minWidth='300px'
      bg='gray.100'
      padding='3'
      borderRadius='12px'
    >
      <StatLabel data-testid='last-month-number'>
        {type} - {lastMonthNumber} last month
      </StatLabel>
      <StatNumber fontWeight='700' data-testid='total-number'>
        {total} {type}
      </StatNumber>
      <StatHelpText data-testid='last-month-percent'>
        <StatArrow type='increase' /> {lastMonthPercent}% since last month
      </StatHelpText>
    </Stat>
  );
}
