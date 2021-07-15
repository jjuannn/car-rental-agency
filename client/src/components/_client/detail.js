import React from 'react';
import {Box, Heading, List, ListItem, ListIcon, Text, Button} from '@chakra-ui/react';
import {AiFillCaretRight, AiOutlineArrowLeft} from 'react-icons/ai';
import {Link} from 'react-router-dom';
export default function ClientDetailCard({
  name,
  surname,
  doc_num,
  doc_type,
  phone,
  address,
  nationality,
  birthdate,
  email,
  id
}) {
  return (
    <Box
      boxShadow='base'
      borderWidth='1px'
      padding='5'
      borderRadius='12px'
      maxWidth='650px'
      overflow='hidden'
    >
      <Box marginY='10px'>
        <Heading fontSize={{sm: '8vw', md: '50px'}} textTransform='capitalize'>
          {name} {surname}
        </Heading>
      </Box>
      <Box>
        <List spacing={3}>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Document: {doc_type} {doc_num}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Address: {address}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Phone: {phone}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Email: {email}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Nationality: {nationality}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Birthdate: {birthdate}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            ID: {id}
          </ListItem>
        </List>
      </Box>
      <Box marginTop='40px'>
        <Link to='/client/list'>
          <Button boxShadow='base' colorScheme='gray' leftIcon={<AiOutlineArrowLeft />}>
            <Text as='span'>Back to list</Text>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
