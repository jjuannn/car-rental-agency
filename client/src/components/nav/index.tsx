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

export default function NavigationBar(): JSX.Element {
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
          <Link data-testid='home-button-link' to='/'>
            Rental Agency
          </Link>
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
          <MenuList data-testid='menu-list'>
            <MenuItem data-testid='menu-item-cars' as={Link} to='/car/list'>
              Cars <Icon marginLeft='2' as={AiOutlineCar} />
            </MenuItem>
            <MenuItem data-testid='menu-item-clients' as={Link} to='/client/list'>
              Clients <Icon marginLeft='2' as={AiOutlineUser} />
            </MenuItem>
            <MenuItem data-testid='menu-item-rentals' as={Link} to='/rental/list'>
              Rentals <Icon marginLeft='2' as={AiOutlineBook} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Divider />
    </>
  );
}
