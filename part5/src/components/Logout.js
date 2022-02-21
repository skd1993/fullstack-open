import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';

const Logout = () => {
  const dispatch = useDispatch();
  const logoff = () => {
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
