import React from 'react';
import TableCell from './cell';
import {Box, Table, Thead, Tr, Th, Tbody} from '@chakra-ui/react';
import Car from '../../entities/car';

interface IProps {
  list: Car[];
}

function CarTable({list}: IProps): JSX.Element {
  return (
    <Box padding='5' border='1px' borderRadius='12px' borderColor='gray.200'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th textAlign='center'>Details</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((car, i) => {
            return <TableCell car={car} key={i} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default CarTable;
