import React from 'react';
import {Text} from '@chakra-ui/react';

interface IProps {
  message: string;
}

export default function ErrorMessage({message}: IProps): JSX.Element {
  return (
    <Text fontSize='16px' padding='3' as='em' color='red'>
      {message}
    </Text>
  );
}
