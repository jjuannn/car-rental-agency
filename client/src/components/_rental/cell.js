import React, {useEffect} from 'react';
import {Tr, Td, Text, HStack, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from 'react-icons/ai';
import useRentals from '../../hooks/useRentals';
import {useHistory} from 'react-router';

export default function TableCell({Client, date_from, date_until, id, Car}) {
  const {rentalDeleteLoading, rentalDeleteSuccess, deleteRental} = useRentals();
  const history = useHistory();

  useEffect(() => {
    if (rentalDeleteSuccess) {
      history.go(0);
    }
  });

  return (
    <>
      <Tr>
        <Td>
          <Text fontWeight='600' textTransform='capitalize'>
            {Client.name} {Client.surname} - <br />
            {Car.year} {Car.brand} {Car.model}
          </Text>
        </Td>
        <Td textAlign='center'>
          <Text fontWeight='600'>
            {date_from} to {date_until}
          </Text>
        </Td>
        <Td isNumeric>
          <HStack justifyContent='flex-end'>
            <Button
              isDisabled={rentalDeleteLoading}
              colorScheme='red'
              variant='outline'
              onClick={() => {
                deleteRental(id);
              }}
            >
              <AiOutlineDelete />
            </Button>
            <Button
              colorScheme='green'
              variant='outline'
              padding='0'
              isDisabled={rentalDeleteLoading}
            >
              <Link to={`/rental/view/id=${id}`} style={{display: 'block', padding: '1em'}}>
                <AiOutlineEye />
              </Link>
            </Button>
            <Button
              colorScheme='blue'
              variant='outline'
              padding='0'
              isDisabled={rentalDeleteLoading}
            >
              <Link to={`/rental/edit/id=${id}`} style={{display: 'block', padding: '1em'}}>
                <AiOutlineEdit />
              </Link>
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
}
