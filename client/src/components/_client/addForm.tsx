import React, {FormEvent, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
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
import useClients from '../../hooks/useClients';

export default function AddClientForm() {
  const {addingClientError, addingClientLoading, addingClientSuccess, addClient} = useClients();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (addingClientSuccess) {
      setRedirect(true);
    }
  }, [addingClientSuccess]);

  const handleSubmit = (event: FormEvent<HTMLElement>): void => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const values = Object.fromEntries(form.entries());
    addClient(values);
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
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Name</FormLabel>
        <Input type='text' name='name' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Surname</FormLabel>
        <Input type='text' name='surname' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Address</FormLabel>
        <Input type='text' name='address' isRequired />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Phone</FormLabel>
        <Input type='number' name='phone' min='999999' max='9999999999999' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Email</FormLabel>
        <Input type='text' name='e_mail' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Nationality</FormLabel>
        <Input type='text' name='nationality' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Birthdate</FormLabel>
        <Input type='date' name='birthdate' />
      </FormControl>
      <Box display='flex' marginBottom='10' flexDirection={{sm: 'column', md: 'row'}}>
        <FormControl as='fieldset' isRequired>
          <FormLabel>Document type</FormLabel>
          <RadioGroup defaultValue='DNI' name='doc_type'>
            <HStack spacing='24px'>
              <Radio value='DNI'>DNI</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as='fieldset' isRequired>
          <FormLabel>Document number</FormLabel>
          <Input type='number' name='doc_num' min='999999' max='99999999' />
        </FormControl>
      </Box>
      <Button
        type='submit'
        boxShadow='base'
        leftIcon={<AiOutlineSave />}
        isDisabled={addingClientLoading}
      >
        Submit{' '}
      </Button>
      {addingClientError && <ErrorMessage message={addingClientError.message} />}
      {redirect && <Redirect from='/client/add' to='/client/list' />}
    </Box>
  );
}
