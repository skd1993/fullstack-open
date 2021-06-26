import React from "react";

const Logout = ({setUser, setNotification}) => {
	const logout = () => {
		try {
			window.localStorage.setItem('loggedInUser', null)
			setUser(null)
			setNotification('Logged out user successfully')
			setTimeout(() => {
				setNotification(null)
			}, 2500)
		} catch (error) {
			setNotification('Some error occurred')
			setTimeout(() => {
				setNotification(null)
			}, 2500)
			console.log("Log out error", error)
		}
	}
	return (
		<div>
			<button onClick={logout}>Logout</button>
		</div>
	)
}

export default Logout