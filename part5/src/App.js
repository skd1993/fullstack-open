import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import Login from "./components/Login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";

const App = () => {
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		try {
			const userLocalData = window.localStorage.getItem('loggedInUser')
			if (userLocalData) {
				setUser(JSON.parse(userLocalData))
			}
		} catch (error) {
			console.log(error)
		}
	}, [])

	return (
		<div>
			{notification && <Notification notification={notification}/>}
			{
				user ?
					<div><h1>Blogs</h1><p>{user.name} logged in <Logout setUser={setUser} setNotification={setNotification}/></p>
						<Blog setNotification={setNotification}/></div> :
					<Login setUser={setUser} setNotification={setNotification}/>
			}
		</div>
	)
}

export default App