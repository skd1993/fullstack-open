import React, {useState} from 'react';
import {loginService} from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, notificationHandler}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onChange = (event) => {
		event.target.name === 'username' ? setUsername(event.target.value) : setPassword(event.target.value)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const response = await loginService({username, password})
			notificationHandler("Logged in successfully")
			console.log("Logged in", response);
			setUser(response)
			blogService.setToken(response.token)
			setPassword('')
			setUsername('')
			window.localStorage.setItem('loggedInUser', JSON.stringify(response))
		} catch (error) {
			notificationHandler(error.response.data.error);
		}
	}
	return (
		<div>
			<h1>Login to application</h1>
			<form onSubmit={handleLogin}>
				<div><label htmlFor="username">Username: </label>
					<input type="text" name={"username"} placeholder={"Enter username here"} value={username}
					       onChange={onChange}/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input type="password" name={"password"} placeholder={"Enter password here"} value={password}
					       onChange={onChange}/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login