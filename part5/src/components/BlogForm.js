import React, {useState} from 'react';
import blogService from '../services/blogs'

const BlogForm = ({notificationHandler, blogFormToggleRef, blogUpdateRef}) => {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');

	const buttonName = "Create";

	const changeHandler = (event) => {
		const {value, name} = event.target;
		if (name === 'title') setTitle(value)
		else if (name === 'url') setUrl(value)
	}

	const blogSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			await blogService.submitBlog({title, url})
			notificationHandler(`Blog added successfully: ${title}`)
			setUrl('')
			setTitle('')
			await blogUpdateRef.current.blogUpdateHandler();
			blogFormToggleRef.current.visibilityHandler();
		} catch (e) {
			console.log('Blog cannot be added', e)
			notificationHandler(e.response.data.error)
		}
	}

	return (
		<div>
			<form onSubmit={blogSubmitHandler}>
				<h1>Create new blog</h1>
				<div><label htmlFor={"title"}>Title: </label>
					<input type={"text"} name={"title"} placeholder={"title of blog post"} onChange={changeHandler}
					       value={title} id={'title'} /></div>
				<div><label htmlFor={"url"}>URL: </label>
					<input type={"text"} name={"url"} placeholder={"url of blog post"} onChange={changeHandler} value={url} id={'url'} />
				</div>
				<button type={"submit"}>{buttonName}</button>
			</form>
		</div>
	)
}

export default BlogForm