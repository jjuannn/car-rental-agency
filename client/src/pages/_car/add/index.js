import CarForm from '../../../components/form/car/index';
import {Box, Flex} from '@chakra-ui/react';
import Title from '../../../components/title/index';

export default function AddCar() {
  // nothing here bc
  // i don't need do anything
  return (
    <Flex as='section' padding='5' flex='1' direction='column' alignItems='center'>
      <Box alignSelf='flex-start'>
        <Title title='Add car' subtitle='Please enter the car data' />
      </Box>
      <CarForm />
    </Flex>
  );
}
