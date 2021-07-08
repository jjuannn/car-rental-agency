import React from 'react';
import {Box, Text, Image, Heading, ListIcon, ListItem, List, Button} from '@chakra-ui/react';
import {AiFillCaretRight, AiOutlineArrowLeft} from 'react-icons/ai';
import {Link} from 'react-router-dom';
export default function CarDetailCard({
  images,
  year,
  brand,
  model,
  mileage,
  passengers,
  price_per_day,
  hasAC,
  gearbox_type
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
      <Image src={images} borderRadius='12px' />
      <Box marginY='10px'>
        <Heading fontSize={{sm: '8vw', md: '50px'}}>
          {year} {brand} {model}
        </Heading>
      </Box>
      <Box>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Mileage: {mileage}
          </ListItem>
          <ListItem>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Passengers: {passengers}
          </ListItem>
          <ListItem>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Price per day ($ARS): {price_per_day}
          </ListItem>
          <ListItem>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Has AC: {hasAC === true ? 'Yes' : 'No'}
          </ListItem>
          <ListItem>
            <ListIcon as={AiFillCaretRight} color='teal.main' />
            Gearbox type: {gearbox_type}
          </ListItem>
        </List>
      </Box>
      <Box marginTop='10px'>
        <Link to='/car/list'>
          <Button boxShadow='base' colorScheme='gray' leftIcon={<AiOutlineArrowLeft />}>
            <Text as='span'>Back to list</Text>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
