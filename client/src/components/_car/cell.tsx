import React, {useEffect} from 'react';
import {AiOutlineEye, AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import {HStack, Button, Text, Tr, Td, Image} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import useCars from '../../hooks/useCars';
import Car from '../../entities/car';

interface IProps {
  car: Car;
}

function TableCell({car}: IProps): JSX.Element {
  const {images, year, model, brand, id} = car;

  const {deleteCarLoading, deleteCarSuccess, deleteCar} = useCars();
  const history = useHistory();

  useEffect(() => {
    if (deleteCarSuccess) {
      history.go(0);
    }
  }, [deleteCarSuccess, history]);
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
          <Button colorScheme='green' variant='outline' padding='0' isDisabled={deleteCarLoading}>
            <Link to={`/car/view/id=${id}`} style={{display: 'block', padding: '1em'}}>
              <AiOutlineEye />
            </Link>
          </Button>
          <Button colorScheme='blue' variant='outline' padding='0' isDisabled={deleteCarLoading}>
            <Link to={`/car/edit/id=${id}`} style={{display: 'block', padding: '1em'}}>
              <AiOutlineEdit />
            </Link>
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default TableCell;
