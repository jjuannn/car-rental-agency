import {Box, Text, Link} from '@chakra-ui/react';
import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <Box as='footer' textAlign='center' padding='10px' data-testid='footer'>
      <Text as='i'>
        Car Rental Agency made by{' '}
        <Link
          data-testid='link'
          color='teal.200'
          fontWeight='600'
          href='https://github.com/jjuannn'
          target='_blank'
          rel='norefferer'
        >
          Juan Avero
        </Link>
      </Text>
    </Box>
  );
}
