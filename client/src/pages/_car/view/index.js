import React, {useEffect} from 'react';
import {Flex, Box} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import useCars from '../../../hooks/useCars';
import CarDetailCard from '../../../components/detail/car';
export default function CarDetail() {
  const {id} = useParams();
  const {getCar, carDetailData, carDetailError, carDetailLoading} = useCars();

  useEffect(() => {
    getCar(id);
  }, []);

  return (
    <Flex as='section' flex='1' padding='5' justifyContent='center'>
      {carDetailData && <CarDetailCard {...carDetailData} />}
    </Flex>
  );
}
