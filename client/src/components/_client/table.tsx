import React from 'react';
import {Box, Table, Thead, Tr, Th, Tbody} from '@chakra-ui/react';
import TableCell from './cell';
import Client from '../../entities/client';

interface IProps {
  list: Client[];
}

export default function ClientTable({list}: IProps): JSX.Element {
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
            return <TableCell client={client} key={i} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
