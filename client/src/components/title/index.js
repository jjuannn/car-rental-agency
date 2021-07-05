import React from 'react';
import {Box, Heading} from '@chakra-ui/react';

export default function Title(props) {
  const {title, subtitle} = props;
  return (
    <Box padding='10px'>
      <Heading color='teal.main' size='xl'>
        {title}
      </Heading>
      <Heading color='gray' size='sm'>
        {subtitle}
      </Heading>
    </Box>
  );
}
