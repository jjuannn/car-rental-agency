import React from 'react';
import {Box, Heading} from '@chakra-ui/react';

interface IProps {
  title: string;
  subtitle: string;
}

export default function Title({title, subtitle}: IProps): JSX.Element {
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
