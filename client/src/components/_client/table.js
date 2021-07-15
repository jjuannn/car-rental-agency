import React from 'react';
import {Box, Table, Thead, Tr, Th, Tbody} from '@chakra-ui/react';
import TableCell from './cell';

export default function ClientTable(props) {
  const {list} = props;
  return (
    <Box padding='5' border='1px' borderRadius='12px' borderColor='gray.200'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((client, i) => {
            return <TableCell {...client} key={i} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
