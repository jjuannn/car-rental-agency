import React, {useEffect} from 'react';
import {Flex, Box} from '@chakra-ui/react';
import CarForm from '../../components/_car/editForm';
import {useParams} from 'react-router-dom';
import useCars from '../../hooks/useCars';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/error';
import Title from '../../components/title';

export default function EditCar() {
  const {id} = useParams();
  const {carDetailError, carDetailLoading, carDetailData, getCar} = useCars();

  useEffect(() => {
    getCar(id);
  }, []);

  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Add car' subtitle='Please enter the car data' />
      </Box>
      {carDetailError && <ErrorMessage message={carDetailError.message} />}
      {carDetailLoading && <Loading />}
      {carDetailData && <CarForm {...carDetailData} />}
    </Flex>
  );
}
