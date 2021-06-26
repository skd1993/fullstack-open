import React, {useState} from 'react';
import blogService from '../services/blogs'

const BlogForm = ({setNotification}) => {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');

	const changeHandler = (event) => {
		const {value, name} = event.target;
		if (name === 'title') setTitle(value)
		else if (name === 'url') setUrl(value)
	}

	const blogSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			await blogService.submitBlog({title, url})
			setNotification(`Blog added successfully: ${title}`)
			setTimeout(() => {
				setNotification(null)
			}, 2500)
			setUrl('')
			setTitle('')
		} catch (e) {
			console.log('Blog cannot be added', e)
			setNotification(e.response.data.error)
			setTimeout(() => {
				setNotification(null)
			}, 2500)
		}
	}

	return (
		<div>
			<form onSubmit={blogSubmitHandler}>
				<h1>Create new blog</h1>
				<div><label htmlFor={"title"}>Title: </label>
					<input type={"text"} name={"title"} placeholder={"title of blog post"} onChange={changeHandler}
					       value={title}/></div>
				<div><label htmlFor={"url"}>URL: </label>
					<input type={"text"} name={"url"} placeholder={"url of blog post"} onChange={changeHandler} value={url}/>
				</div>
				<button type={"submit"}>create</button>
			</form>
		</div>
	)
}

export default BlogForm