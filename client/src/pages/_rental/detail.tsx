import React, {useEffect} from 'react';
import {Flex} from '@chakra-ui/react';
import useRentals from '../../hooks/useRentals';
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading';
import {useParams} from 'react-router';
import RentalDetailCard from '../../components/_rental/detail';

export default function RentalDetail(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const {rentalDetailData, rentalDetailLoading, rentalDetailError, getRental} = useRentals();

  useEffect(() => {
    getRental(id);
  }, []);

  return (
    <Flex as='section' flex='1' padding='5' justifyContent='center' alignItems='center'>
      {rentalDetailData && <RentalDetailCard rental={rentalDetailData} />}
      {rentalDetailError && <ErrorMessage message={rentalDetailError.message} />}
      {rentalDetailLoading && <Loading />}
    </Flex>
  );
}
