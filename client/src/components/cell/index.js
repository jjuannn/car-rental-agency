import React, {useEffect} from 'react';
import {AiOutlineEye, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import {HStack, Button, Text, Tr, Td, Image} from '@chakra-ui/react';
import {useHistory} from 'react-router-dom';
import useCars from '../../hooks/useCars';
export default function TableCell({images, year, model, brand, id}) {
  const {deleteCarError, deleteCarLoading, deleteCarSuccess, deleteCar} = useCars();
  const history = useHistory();

  useEffect(() => {
    if (deleteCarSuccess) {
      history.go(0);
    }
  }, [deleteCarSuccess]);

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
          <Button
            isDisabled={deleteCarLoading}
            colorScheme='red'
            variant='outline'
            onClick={() => {
              deleteCar(id);
            }}
          >
            <AiOutlineDelete />
          </Button>
          <Button colorScheme='green' variant='outline'>
            <AiOutlineEye />
          </Button>
          <Button colorScheme='blue' variant='outline'>
            <AiOutlineEdit />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
