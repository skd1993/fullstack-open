import React from 'react';
import { Stack, Box, Button } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import Logout from '../Logout';

const MenuLinks = ({ isOpen, user }) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to='/'>Blogs</MenuItem>
        <MenuItem to='/users'>Users</MenuItem>
        <MenuItem to='#'>{user} logged in</MenuItem>
        <Logout />
      </Stack>
    </Box>
  );
};

export default MenuLinks;
