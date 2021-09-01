import React from 'react';
import {Box, Text, List, ListItem, ListIcon, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {AiOutlineArrowLeft, AiFillCaretRight} from 'react-icons/ai';
import Rental from '../../entities/rental';

interface IProps {
  rental: Rental;
}

export default function RentalDetailCard({rental}: IProps): JSX.Element {
  const {
    Car,
    Client,
    id,
    date_from,
    date_until,
    is_paid,
    payment_method,
    price_per_day,
    status,
    total_price
  } = rental;

  return (
    <Box boxShadow='base' borderWidth='1px' padding='5' borderRadius='12px' overflow='hidden'>
      <Box>
        <List spacing={3}>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Client: {Client.name} {Client.surname}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Car: {Car.year} {Car.brand} {Car.model}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Start date: {date_from}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Finish date: {date_until}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Total price: ${total_price} (${price_per_day} per day)
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Is paid: {is_paid ? 'Yes' : 'No'}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Payment method: {payment_method}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Status: {status}
          </ListItem>
          <ListItem textTransform='capitalize'>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Rental ID: {id}
          </ListItem>
        </List>
      </Box>
      <Box marginTop='40px'>
        <Link to='/rental/list'>
          <Button boxShadow='base' colorScheme='gray' leftIcon={<AiOutlineArrowLeft />}>
            <Text as='span'>Back to list</Text>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
