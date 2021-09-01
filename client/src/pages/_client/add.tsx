import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Title from '../../components/title';
import AddClientForm from '../../components/_client/addForm';

export default function AddClient(): JSX.Element {
  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Add client' subtitle='Please enter the client data' />
      </Box>
      <AddClientForm />
    </Flex>
  );
}
