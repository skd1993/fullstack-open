import axios from 'axios'

const baseUrl = '/api/blogs'

let token = ''

const setToken = (userToken) => {
	token = `bearer ${userToken}`;
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const submitBlog = async (blogObj) => {
	const config = {headers: {Authorization: token}}
	const response = await axios.post(baseUrl, blogObj, config)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, setToken, submitBlog}