import CarForm from '../../components/_car/addForm';
import {Box, Flex} from '@chakra-ui/react';
import Title from '../../components/error/index';

export default function AddCar() {
  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Add car' subtitle='Please enter the car data' />
      </Box>
      <CarForm />
    </Flex>
  );
}
