import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import Notification from './Notification';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChange = (event) => {
    event.target.name === 'username'
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password, setPassword, setUsername));
  };

  return (
    <div>
      <h1>Login to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            id='username'
            type='text'
            name={'username'}
            placeholder={'Enter username here'}
            value={username}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            id='password'
            type='password'
            name={'password'}
            placeholder={'Enter password here'}
            value={password}
            onChange={onChange}
          />
        </div>
        <button type='submit' id='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
