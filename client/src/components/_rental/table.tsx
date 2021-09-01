import React from 'react';
import {Box, Table, Thead, Tr, Th, Tbody} from '@chakra-ui/react';
import TableCell from './cell';
import Rental from '../../entities/rental';

interface IProps {
  list: Rental[];
}

export default function RentalTable({list}: IProps): JSX.Element {
  return (
    <Box padding='5' border='1px' borderRadius='12px' borderColor='gray.200'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th textAlign='center'>Date</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((rental, i) => {
            return <TableCell rental={rental} key={i} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
