import React from 'react';
import { Flex } from '@chakra-ui/react';

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={4}
      p={8}
      bg={['green.500', 'green.500', 'green.500', 'green.500']}
      color={['gray.200', 'gray.200', 'gray.200', 'gray.200']} 
      position='fixed'
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBarContainer;
