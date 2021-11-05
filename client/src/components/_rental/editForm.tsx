import React, {useCallback, useEffect, useState, FormEvent} from 'react';
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
import Rental from '../../entities/rental';
import Car from '../../entities/car';
import Client from '../../entities/client';

interface IProps {
  rental: Rental;
}

export default function EditRentalForm({rental}: IProps): JSX.Element {
  const {fk_car, fk_client, id, date_from, date_until, payment_method, is_paid} = rental;
  const {data: clients, getClients} = useClients();
  const {data: cars, getCars} = useCars();
  const {rentalEditError, rentalEditLoading, rentalEditSuccess, editRental} = useRentals();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (rentalEditSuccess) {
      setRedirect(true);
    }
  }, [rentalEditSuccess]);

  useEffect(() => {
    getClients();
    getCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCarPricePerDay = useCallback(
    (id: number) => {
      const car: Car = cars.find((car: Car) => Number(car.id) === id);
      const price = car && car.price_per_day;
      return price;
    },
    [cars]
  );

  const handleSubmit = (event: FormEvent<HTMLElement>): void => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const values = Object.fromEntries(form.entries());
    const price = getCarPricePerDay(Number(values.fk_car));
    values.price_per_day = price;
    values.status = 'active';
    editRental(id, values);
  };

  return (
    <Box
      onSubmit={handleSubmit}
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
          <Select placeholder='Select car' defaultValue={fk_car} name='fk_car'>
            {cars &&
              cars.map((car: Car, i: number) => {
                return (
                  <option selected={Number(fk_car) === Number(car.id)} key={i} value={car.id}>
                    {car.year} {car.brand} {car.model}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        <FormControl as='fieldset' isRequired marginBottom='10' marginLeft={{md: '5'}}>
          <FormLabel>Client</FormLabel>
          <Select placeholder='Select client' defaultValue={fk_client} name='fk_client'>
            {clients &&
              clients.map((client: Client, i: number) => {
                return (
                  <option
                    selected={Number(fk_client) === Number(client.id)}
                    key={i}
                    value={client.id}
                  >
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
          <Input type='date' name='date_from' defaultValue={date_from} />
        </FormControl>
        <FormControl as='fieldset' marginBottom='10' isRequired marginLeft={{md: '5'}}>
          <FormLabel>Until</FormLabel>
          <Input type='date' name='date_until' defaultValue={date_until} />
        </FormControl>
      </Box>
      <Box display='flex' flexDirection={{sm: 'column', md: 'row'}}>
        <FormControl as='fieldset' marginBottom='10' isRequired marginRight={{md: '5'}}>
          <FormLabel>Payment method</FormLabel>
          <Select
            placeholder='Select payment method'
            defaultValue={payment_method}
            name='payment_method'
          >
            <option value='credit card'>Credit card</option>
            <option value='debit card'>Debit card</option>
            <option value='cash'>Cash</option>
            <option value='transaction'>Transaction</option>
          </Select>
        </FormControl>
        <FormControl as='fieldset' marginBottom='10' isRequired marginLeft={{md: '5'}}>
          <FormLabel marginBottom='15px'>Is paid</FormLabel>
          <RadioGroup defaultValue={`${is_paid}`} name='is_paid' justifyContent='center'>
            <HStack spacing='24px'>
              <Radio value='true'>Yes</Radio>
              <Radio value='false'>No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Button
        type='submit'
        boxShadow='base'
        leftIcon={<AiOutlineSave />}
        isDisabled={rentalEditLoading}
      >
        Submit{' '}
      </Button>
      {rentalEditError && <ErrorMessage message={rentalEditError.message} />}
      {redirect && <Redirect from='/rental/add' to='/rental/list' />}
    </Box>
  );
}
