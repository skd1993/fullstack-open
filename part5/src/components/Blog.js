import React, {useEffect, useState} from 'react'
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";

const Blog = ({setNotification}) => {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [blogs])

	return (
		<div>
			<BlogForm
				setNotification={setNotification}
			/>
			<br/>
			{
				blogs.map(blog => <div key={blog.id}>{blog.title} {blog.author}</div>)
			}
		</div>
	)
}

export default Blog