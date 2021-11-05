import React, {useEffect} from 'react';
import {Flex} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import useCars from '../../hooks/useCars';
import CarDetailCard from '../../components/_car/detail';
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading/index';

export default function CarDetail(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const {getCar, carDetailData, carDetailError, carDetailLoading} = useCars();

  useEffect(() => {
    getCar(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex as='section' flex='1' padding='5' justifyContent='center'>
      {carDetailData && <CarDetailCard car={carDetailData} />}
      {carDetailLoading && <Loading />}
      {carDetailError && <ErrorMessage message={carDetailError.message} />}
    </Flex>
  );
}
