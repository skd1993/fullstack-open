import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState(null)

	const blogFormToggleRef = useRef(null)
	const blogListRef = useRef(null)

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

	const notificationHandler = (msg) => {
		setNotification(msg)
		setTimeout(() => {
			setNotification(null)
		}, 2500)
	}

	return (
		<div>
			{notification && <Notification notification={notification}/>}
			{
				user ?
					<div><h1>Blogs</h1>
						<div><p>{user.name} logged in</p><Logout setUser={setUser} notificationHandler={notificationHandler}/></div>
						<br/>
						<Togglable buttonName={'Create new Blog'} cancelButtonName={'Cancel'} ref={blogFormToggleRef}>
							<BlogForm
								notificationHandler={notificationHandler} blogFormToggleRef={blogFormToggleRef}
								blogUpdateRef={blogListRef}
							/>
						</Togglable>
						< br/>
						<Blog notificationHandler={notificationHandler} ref={blogListRef}/></div> :
					<Login setUser={setUser} notificationHandler={notificationHandler}/>
			}
		</div>
	)
}

export default App