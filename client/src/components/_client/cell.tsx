import React, {useEffect} from 'react';
import {Tr, Td, Text, HStack, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from 'react-icons/ai';
import useClients from '../../hooks/useClients';
import {useHistory} from 'react-router';
import Client from '../../entities/client';

interface IProps {
  client: Client;
}

export default function TableCell({client}: IProps): JSX.Element {
  const {name, surname, id} = client;
  const {deleteClient, deleteClientLoading, deleteClientSuccess} = useClients();
  const history = useHistory();

  useEffect(() => {
    if (deleteClientSuccess) {
      history.go(0);
    }
  }, [deleteClientSuccess, history]);

  return (
    <Tr>
      <Td>
        <Text fontWeight='600' textTransform='capitalize'>
          {name} {surname}
        </Text>
      </Td>
      <Td isNumeric>
        <HStack justifyContent='flex-end'>
          <Button
            disabled={deleteClientLoading}
            colorScheme='red'
            variant='outline'
            onClick={() => {
              deleteClient(id);
            }}
          >
            <AiOutlineDelete />
          </Button>
          <Button
            colorScheme='green'
            variant='outline'
            padding='0'
            isDisabled={deleteClientLoading}
          >
            <Link to={`/client/view/id=${id}`} style={{display: 'block', padding: '1em'}}>
              <AiOutlineEye />
            </Link>
          </Button>
          <Button colorScheme='blue' variant='outline' padding='0' isDisabled={deleteClientLoading}>
            <Link to={`/client/edit/id=${id}`} style={{display: 'block', padding: '1em'}}>
              <AiOutlineEdit />
            </Link>
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
