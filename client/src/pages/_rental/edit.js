import React, {useEffect} from 'react';
import {Flex, Box} from '@chakra-ui/react';
import Title from '../../components/title';
import {useParams} from 'react-router-dom';
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading';
import useRentals from '../../hooks/useRentals';
import EditRentalForm from '../../components/_rental/editForm';

export default function EditRental() {
  const {getRental, rentalDetailError, rentalDetailLoading, rentalDetailData} = useRentals();
  const {id} = useParams();
  useEffect(() => {
    getRental(id);
  }, []);

  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Edit rental' subtitle='Please enter the rental data' />
      </Box>
      {rentalDetailError && <ErrorMessage message={rentalDetailError.message} />}
      {rentalDetailLoading && <Loading />}
      {rentalDetailData && <EditRentalForm {...rentalDetailData} />}
    </Flex>
  );
}
