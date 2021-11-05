import React, {useEffect} from 'react';
import {Flex, Box} from '@chakra-ui/react';
import Title from '../../components/title';
import {useParams} from 'react-router-dom';
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading';
import useRentals from '../../hooks/useRentals';
import EditRentalForm from '../../components/_rental/editForm';

export default function EditRental(): JSX.Element {
  const {getRental, rentalDetailError, rentalDetailLoading, rentalDetailData} = useRentals();
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    getRental(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Edit rental' subtitle='Please enter the rental data' />
      </Box>
      {rentalDetailError && <ErrorMessage message={rentalDetailError.message} />}
      {rentalDetailLoading && <Loading />}
      {rentalDetailData && <EditRentalForm rental={rentalDetailData} />}
    </Flex>
  );
}
