import React, {useEffect} from 'react';
import {Flex, Box, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import Loading from '../../components/loading/index';
import ErrorMessage from '../../components/error/index';
import ClientTable from '../../components/_client/table';
import {AiOutlineFileAdd} from 'react-icons/ai';
import Title from '../../components/title';
import useClients from '../../hooks/useClients';

export default function ClientList() {
  const {data, error, loading, getClients, deleteClientError} = useClients();

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Flex as='section' flex='1' direction='column' padding='5'>
      <Box display='flex' flexDirection='row' justifyContent='space-between' marginBottom='20px'>
        <Title
          title='Client list'
          subtitle={`Looking for ${data ? data.length : '...'} client(s)`}
        />
        <Box alignSelf='flex-end' marginBottom='10px'>
          {deleteClientError && <ErrorMessage message={deleteClientError.message} />}
          <Link to='/client/add'>
            <Button
              leftIcon={<AiOutlineFileAdd />}
              boxShadow='base'
              colorScheme='gray'
              variant='solid'
            >
              Add new
            </Button>
          </Link>
        </Box>
      </Box>
      {error && <ErrorMessage message={error.message} />}
      {loading && <Loading />}
      {data && <ClientTable list={data} />}
    </Flex>
  );
}
