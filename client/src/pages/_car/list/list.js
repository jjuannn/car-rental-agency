import React, {useEffect} from 'react';
import {Box, Flex, Button} from '@chakra-ui/react';
import {AiOutlineFileAdd} from 'react-icons/ai';
import Title from '../../../components/title';
import CarTable from '../../../components/table/car';
import useCars from '../../../hooks/useCars';
import Loading from '../../../components/loading';
import {Link} from 'react-router-dom';
export default function CarList() {
  const {data, error, loading, getCars} = useCars();

  useEffect(() => {
    getCars();
  }, []);

  return (
    <Flex as='section' flex='1' direction='column' padding='5'>
      <Box display='flex' flexDirection='row' justifyContent='space-between' marginBottom='20px'>
        <Title title='Car list' subtitle={`Looking for ${data ? data.length : '...'} car(s)`} />
        <Box alignSelf='flex-end' marginBottom='10px'>
          <Link to='/car/add'>
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
      {error && <p>Error</p>}
      {data && <CarTable list={data} />}
    </Flex>
  );
}
