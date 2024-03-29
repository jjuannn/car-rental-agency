import React, {useEffect} from 'react';
import {Flex} from '@chakra-ui/react';
import useClients from '../../hooks/useClients';
import ClientDetailCard from '../../components/_client/detail';
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading';
import {useParams} from 'react-router';

export default function ClientDetail(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const {clientDetailData, clientDetailError, clientDetailLoading, getClient} = useClients();

  useEffect(() => {
    getClient(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex as='section' flex='1' padding='5' justifyContent='center' alignItems='center'>
      {clientDetailData && <ClientDetailCard client={clientDetailData} />}
      {clientDetailError && <ErrorMessage message={clientDetailError.message} />}
      {clientDetailLoading && <Loading />}
    </Flex>
  );
}
