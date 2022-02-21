import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoff = () => {
    navigate('/');
    dispatch(logout());
  };
  
  return (
    <div>
      <button id='logout-button' onClick={logoff}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
