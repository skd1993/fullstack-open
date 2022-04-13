import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import { LOGIN } from '../apollo/queries';

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [login] = useMutation(LOGIN);

  const submit = async (e) => {
    e.preventDefault();
    const u = usernameRef.current.value;
    const p = passwordRef.current.value;
    try {
      const res = await login({ variables: { username: u, password: p } });
      const t = res.data.login.value;
      await localStorage.setItem('token', t);
      props.setAuthenticated(t);
      props.showMessage('logged in');
    } catch (error) {
      alert(error);
      props.showMessage(error.message);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input placeholder='username' ref={usernameRef} />
        </div>
        <div>
          password
          <input placeholder='password' ref={passwordRef} />
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;
