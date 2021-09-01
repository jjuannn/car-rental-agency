import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  RadioGroup,
  Radio,
  HStack,
  Button
} from '@chakra-ui/react';
import ErrorMessage from '../error';
import {AiOutlineSave} from 'react-icons/ai';
import useCars from '../../hooks/useCars';
import Car from '../../entities/car';

interface IProps {
  car: Car;
}

export default function EditCarForm({car}: IProps) {
  const {
    brand,
    color,
    gearbox_type,
    hasAC,
    images,
    mileage,
    model,
    passengers,
    price_per_day,
    year
  } = car;
  const {editCar, carEditError, carEditLoading, carEditSuccess} = useCars();
  const [redirect, setRedirect] = useState(false);
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (carEditSuccess) {
      setRedirect(true);
    }
  }, [carEditSuccess]);

  const handleSubmit = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    // idk why this is not working
    // formData.get("images") => returns FormDataEntryValue
    // FormDataEntryValue => File | string
    // formData.get("images") instanceof File => true
    // property name exists in type File
    // but typescript is not recognizing him
    // so this is not working and i cannot find a solution
    // if (formData.get('images').name) {  <= Property 'name' does not exist on type 'FormDataEntryValue'.
    //   formData.append('images', URL.createObjectURL(values.images));
    // }

    editCar(id, formData);
  };

  return (
    <Box
      encType='multipart/form-data'
      onSubmit={handleSubmit}
      as='form'
      borderRadius='12px'
      border='1px'
      borderColor='gray.200'
      padding='5'
      width='100%'
    >
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Brand</FormLabel>
        <Input type='text' name='brand' defaultValue={brand} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' name='model' isRequired>
        <FormLabel>Model</FormLabel>
        <Input type='text' name='model' defaultValue={model} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Year</FormLabel>
        <Input type='number' name='year' defaultValue={year} min='1800' max='2020' isRequired />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Price per day</FormLabel>
        <Input type='number' name='price_per_day' defaultValue={price_per_day} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Mileage</FormLabel>
        <Input type='number' name='mileage' defaultValue={mileage} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Color</FormLabel>
        <Input type='text' name='color' defaultValue={color} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Passengers</FormLabel>
        <Input type='number' name='passengers' defaultValue={passengers} min='1' max='15' />
      </FormControl>
      <Box display='flex' marginBottom='10' flexDirection={{sm: 'column', md: 'row'}}>
        <FormControl as='fieldset' isRequired>
          <FormLabel>Has AC</FormLabel>
          <RadioGroup defaultValue={`${hasAC}`} name='hasAC'>
            <HStack spacing='24px'>
              <Radio value='true'>Yes</Radio>
              <Radio value='false'>No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as='fieldset' isRequired>
          <FormLabel>Gearbox type</FormLabel>
          <RadioGroup defaultValue={gearbox_type} name='gearbox_type'>
            <HStack spacing='24px'>
              <Radio value='automatic'>Automatic</Radio>
              <Radio value='manual'>Manual</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </Box>
      <FormControl as='fieldset' marginBottom='10'>
        <FormLabel>Car image</FormLabel>
        <Input padding='1' type='file' name='images' />
      </FormControl>
      <Button
        type='submit'
        boxShadow='base'
        isDisabled={carEditLoading}
        leftIcon={<AiOutlineSave />}
      >
        Submit{' '}
      </Button>
      {carEditError && <ErrorMessage message={carEditError.message} />}
      {redirect && <Redirect from='/car/add' to='/car/list' />}
    </Box>
  );
}
