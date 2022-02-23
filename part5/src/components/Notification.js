import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    notification?.length > 0 && (
        <Box
          p='20px'
          color='white'
          bg='teal.500'
          rounded='md'
          shadow='md'
          mb='2'
        >
          <Text align={'center'}>{notification}</Text>
        </Box>
    )
  );
};

export default Notification;
