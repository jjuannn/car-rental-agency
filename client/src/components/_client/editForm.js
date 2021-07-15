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
import useClients from '../../hooks/useClients';

export default function EditClientForm({
  name,
  surname,
  address,
  phone,
  e_mail,
  nationality,
  birthdate,
  doc_type,
  doc_num
}) {
  const [redirect, setRedirect] = useState(false);
  const {id} = useParams();
  const {clientEditError, clientEditLoading, clientEditSuccess, editClient} = useClients();

  useEffect(() => {
    if (clientEditSuccess) {
      setRedirect(true);
    }
  }, [clientEditSuccess]);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    editClient(id, values);
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
        <FormLabel>Name</FormLabel>
        <Input type='text' name='name' defaultValue={name} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' name='model' isRequired>
        <FormLabel>Surname</FormLabel>
        <Input type='text' name='surname' defaultValue={surname} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Address</FormLabel>
        <Input type='text' name='address' defaultValue={address} isRequired />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Phone</FormLabel>
        <Input type='number' name='phone' defaultValue={phone} min='999999' max='9999999999999' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Email</FormLabel>
        <Input type='text' name='e_mail' defaultValue={e_mail} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Nationality</FormLabel>
        <Input type='text' name='Nationality' defaultValue={nationality} />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Birthdate</FormLabel>
        <Input type='date' name='birthdate' defaultValue={birthdate} />
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
          <Input type='number' name='doc_num' defaultValue={doc_num} min='999999' max='99999999' />
        </FormControl>
      </Box>
      <Button
        type='submit'
        boxShadow='base'
        isDisabled={clientEditLoading}
        leftIcon={<AiOutlineSave />}
      >
        Submit{' '}
      </Button>
      {clientEditError && <ErrorMessage message={clientEditError.message} />}
      {redirect && <Redirect from='/client/add' to='/client/list' />}
    </Box>
  );
}
