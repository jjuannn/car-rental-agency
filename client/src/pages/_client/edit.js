import React, {useEffect} from 'react';
import {Flex, Box} from '@chakra-ui/react';
import ClientForm from '../../components/_client/editForm';
import {useParams} from 'react-router-dom';
import useClients from '../../hooks/useClients';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/error';
import Title from '../../components/title';

export default function EditClient() {
  const {id} = useParams();
  const {clientDetailData, clientDetailError, clientDetailLoading, getClient} = useClients();

  useEffect(() => {
    getClient(id);
  }, []);

  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Edit client' subtitle='Please enter the client data' />
      </Box>
      {clientDetailError && <ErrorMessage message={clientDetailError.message} />}
      {clientDetailLoading && <Loading />}
      {clientDetailData && <ClientForm {...clientDetailData} />}
    </Flex>
  );
}
