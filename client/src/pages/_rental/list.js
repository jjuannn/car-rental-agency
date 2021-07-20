import React, {useEffect} from 'react';
import {Flex, Box, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import Loading from '../../components/loading/index';
import ErrorMessage from '../../components/error/index';
import RentalTable from '../../components/_rental/table';
import {AiOutlineFileAdd} from 'react-icons/ai';
import Title from '../../components/title';
import useRentals from '../../hooks/useRentals';

export default function RentalList() {
  const {data, error, loading, rentalDeleteError, getRentals} = useRentals();
  useEffect(() => {
    getRentals();
  }, []);

  return (
    <Flex as='section' flex='1' direction='column' padding='5'>
      <Box display='flex' flexDirection='row' justifyContent='space-between' marginBottom='20px'>
        <Title
          title='Rental list'
          subtitle={`Looking for ${data ? data.length : '...'} rental(s)`}
        />
        <Box alignSelf='flex-end' marginBottom='10px'>
          {rentalDeleteError && <ErrorMessage message={rentalDeleteError.message} />}
          <Link to='/rental/add'>
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
      {loading && <Loading />}
      {error && <ErrorMessage message={error.message} />}
      {data && <RentalTable list={data} />}
    </Flex>
  );
}
