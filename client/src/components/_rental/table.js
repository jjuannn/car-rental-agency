import React from 'react';
import {Box, Table, Thead, Tr, Th, Tbody} from '@chakra-ui/react';
import TableCell from './cell';

export default function RentalTable(props) {
  const {list} = props;
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
            return <TableCell {...rental} key={i} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
