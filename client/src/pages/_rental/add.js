import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Title from '../../components/title';
import AddRentalFrom from '../../components/_rental/addForm';

export default function AddRental() {
  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Add rental' subtitle='Please enter the rental data' />
      </Box>
      <AddRentalFrom />
    </Flex>
  );
}
