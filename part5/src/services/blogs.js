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

const incrementLikes = async (blogId, likesObj) => {
	const response = await axios.put(`${baseUrl}/${blogId}`, likesObj)
	return response.data
}

const deleteBlog = async (blogId) => {
	const config = {headers: {Authorization: token}}
	const response = await axios.delete(`${baseUrl}/${blogId}`, config)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, setToken, submitBlog, incrementLikes, deleteBlog}