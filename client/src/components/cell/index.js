import React from 'react';
import {AiOutlineEye, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import {HStack, Button, Text, Tr, Td, Image} from '@chakra-ui/react';

export default function TableCell({images, year, model, brand}) {
  return (
    <Tr>
      <Td>
        <Image borderRadius='12px' maxHeight='120px' maxWidth='220px' src={images} />
      </Td>
      <Td textAlign='center'>
        <Text fontWeight='600' textTransform='capitalize'>
          {year} {brand} {model}
        </Text>
      </Td>
      <Td isNumeric>
        <HStack justifyContent='flex-end'>
          <Button>
            <AiOutlineDelete />
          </Button>
          <Button>
            <AiOutlineEye />
          </Button>
          <Button>
            <AiOutlineEdit />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
