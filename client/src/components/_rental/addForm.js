import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  RadioGroup,
  Select,
  Radio,
  HStack,
  Button
} from '@chakra-ui/react';
import ErrorMessage from '../error';
import {AiOutlineSave} from 'react-icons/ai';
import useClients from '../../hooks/useClients';
import useCars from '../../hooks/useCars';
import useRentals from '../../hooks/useRentals';

export default function AddRentalForm() {
  const {loading: clientsLoading, data: clients, error: clientsError, getClients} = useClients();
  const {loading: carsLoading, data: cars, error: carsError, getCars} = useCars();
  const {rentalAddError, rentalAddSending, rentalAddSuccess, addRental} = useRentals();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (rentalAddSuccess) {
      setRedirect(true);
    }
  });

  useEffect(() => {
    getClients();
    getCars();
  }, []);

  const getCarPricePerDay = id => {
    const car = cars.find(car => car.id === Number(id));
    const price = car && car.price_per_day;
    return price;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const form = new FormData(event.target);
    const values = Object.fromEntries(form.entries());
    const price = getCarPricePerDay(values.fk_car);
    values.price_per_day = price;
    addRental(values);
  };

  return (
    <Box
      onSubmit={e => {
        handleSubmit(e);
      }}
      encType='multipart/form-data'
      as='form'
      borderRadius='12px'
      border='1px'
      borderColor='gray.200'
      padding='5'
      width='100%'
    >
      <Box display='flex' flexDirection={{sm: 'column', md: 'row'}}>
        <FormControl as='fieldset' isRequired marginBottom='10' marginRight={{md: '5'}}>
          <FormLabel>Car</FormLabel>
          <Select placeholder='Select car' name='fk_car'>
            {cars &&
              cars.map((car, i) => {
                return (
                  <option key={i} value={car.id}>
                    {car.year} {car.brand} {car.model}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        <FormControl as='fieldset' isRequired marginBottom='10' marginLeft={{md: '5'}}>
          <FormLabel>Client</FormLabel>
          <Select placeholder='Select client' name='fk_client'>
            {clients &&
              clients.map((client, i) => {
                return (
                  <option key={i} value={client.id}>
                    {client.name} {client.surname}
                  </option>
                );
              })}
          </Select>
        </FormControl>
      </Box>
      <Box display='flex' flexDirection={{sm: 'column', md: 'row'}}>
        <FormControl as='fieldset' marginBottom='10' isRequired marginRight={{md: '5'}}>
          <FormLabel>From</FormLabel>
          <Input type='date' name='date_from' />
        </FormControl>
        <FormControl as='fieldset' marginBottom='10' isRequired marginLeft={{md: '5'}}>
          <FormLabel>Until</FormLabel>
          <Input type='date' name='date_until' />
        </FormControl>
      </Box>
      <Box display='flex' flexDirection={{sm: 'column', md: 'row'}}>
        <FormControl as='fieldset' marginBottom='10' isRequired marginRight={{md: '5'}}>
          <FormLabel>Payment method</FormLabel>
          <Select placeholder='Select payment method' name='payment_method'>
            <option value='credit card'>Credit card</option>
            <option value='debit card'>Debit card</option>
            <option value='cash'>Cash</option>
            <option value='transaction'>Transaction</option>
          </Select>
        </FormControl>
        <FormControl as='fieldset' marginBottom='10' isRequired marginLeft={{md: '5'}}>
          <FormLabel marginBottom='15px'>Is paid</FormLabel>
          <RadioGroup defaultValue='true' name='is_paid' justifyContent='center'>
            <HStack spacing='24px'>
              <Radio value='true'>Yes</Radio>
              <Radio value='false'>No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Button type='submit' boxShadow='base' leftIcon={<AiOutlineSave />}>
        Submit{' '}
      </Button>
      {rentalAddError && <ErrorMessage message={rentalAddError.message} />}
      {redirect && <Redirect from='/rental/add' to='/rental/list' />}
    </Box>
  );
}
