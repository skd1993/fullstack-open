import React from "react";

const Logout = ({setUser, notificationHandler}) => {
	const logout = () => {
		try {
			window.localStorage.setItem('loggedInUser', null)
			setUser(null)
			notificationHandler('Logged out user successfully')
		} catch (error) {
			notificationHandler('Some error occurred')
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