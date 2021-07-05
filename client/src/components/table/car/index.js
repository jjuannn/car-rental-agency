import React from 'react';
import TableCell from '../../cell';
import {Flex, Title, Box, Table, Thead, Tr, Th, Tbody} from '@chakra-ui/react';

export default function CarTable(props) {
  const {list} = props;
  console.log(list);
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
            return <TableCell {...car} key={i} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
