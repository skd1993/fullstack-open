import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import {Button} from '@chakra-ui/react'

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoff = () => {
    navigate('/');
    dispatch(logout());
  };
  
  return (
    <div>
      <Button id='logout-button' onClick={logoff} colorScheme='blue' size='sm'>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
