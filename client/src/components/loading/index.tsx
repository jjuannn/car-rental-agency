import React from 'react';
import {Box, Spinner} from '@chakra-ui/react';

export default function Loading(): JSX.Element {
  return (
    <Box display='flex' marginTop='30px' justifyContent='center'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='teal.main' size='xl' />
    </Box>
  );
}
