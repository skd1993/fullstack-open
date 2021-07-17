import React, { useEffect, useState, useImperativeHandle } from 'react';
import blogService from '../services/blogs';
import BlogContent from './BlogContent';

const Blog = React.forwardRef(({ notificationHandler }, ref) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await blogUpdateHandler();
    }

    fetchData();
  }, []);

  const blogUpdateHandler = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useImperativeHandle(ref, () => {
    return { blogUpdateHandler };
  });

  const likesIncrementHandler = async (blogId, likes) => {
    try {
      const response = await blogService.incrementLikes(blogId, {
        likes: likes + 1,
      });
      notificationHandler(response);
      await blogUpdateHandler();
    } catch (e) {
      notificationHandler(e.response.data);
    }
  };

  const removeBlogHandler = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        const response = await blogService.deleteBlog(blog.id);
        notificationHandler(response);
        await blogUpdateHandler();
      }
    } catch (e) {
      notificationHandler(e.response?.data.error);
      console.log(e);
    }
  };

  return (
    <div id='blog-list'>
      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog, index) => (
            <BlogContent
              index={index}
              blog={blog}
              likesIncrementHandler={likesIncrementHandler}
              removeBlogHandler={removeBlogHandler}
            />
          ))
        // <div key={blog.id} style={{border: "1px solid black", padding: "10px"}} class={"blogContainer"}>
        // 	<div><span style={{fontWeight: "bold", fontSize: "1.2em"}}>{blog.title}</span> {blog.author}</div>
        // 	<Togglable buttonName={"View"} cancelButtonName={"Hide"}>
        // 		<div>
        // 			<p>URL: {blog.url}</p>
        // 			<div><span>Likes: {blog.likes} </span>
        // 				<button onClick={() => likesIncrementHandler(blog.id, blog.likes)}>Like</button>
        // 			</div>
        // 			<button onClick={() => removeBlogHandler(blog)}>Remove</button>
        // 		</div>
        // 	</Togglable>
        // </div>)
      }
    </div>
  );
});

export default Blog;
