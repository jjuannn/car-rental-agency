import React from 'react';
import {
  Heading,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Divider
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {AiOutlineUser, AiOutlineCar, AiOutlineMenu, AiOutlineBook} from 'react-icons/ai';

export default function NavigationBar() {
  return (
    <>
      <Flex as='nav' direction='row' alignItems='center' justifyContent='space-between' padding='5'>
        <Heading
          boxShadow='base'
          padding='2'
          color='white'
          fontWeight='500'
          borderRadius='12px'
          bg='teal.main'
          size='md'
        >
          <Link to='/'>Rental Agency</Link>
        </Heading>
        <Menu>
          <MenuButton
            border='1px'
            borderColor='gray.100'
            boxShadow='base'
            as={Button}
            rightIcon={<AiOutlineMenu />}
          >
            Manage
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to='/cars'>
              Cars <Icon marginLeft='2' as={AiOutlineCar} />
            </MenuItem>
            <MenuItem as={Link} to='/clients'>
              Clients <Icon marginLeft='2' as={AiOutlineUser} />
            </MenuItem>
            <MenuItem as={Link} to='/rentals'>
              Rentals <Icon marginLeft='2' as={AiOutlineBook} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Divider />
    </>
  );
}
