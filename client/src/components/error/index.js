import React from 'react';
import {Text} from '@chakra-ui/react';

export default function ErrorMessage(props) {
  const {message} = props;
  return (
    <Text fontSize='16px' padding='3' as='em' color='red'>
      {message}
    </Text>
  );
}
