import React, { useEffect } from 'react';
import BlogContent from './BlogContent';
import { useDispatch, useSelector } from 'react-redux';
import { showBlogs, like, deleteBlog } from '../redux/actions';

const Blog = React.forwardRef((props, ref) => {
  // const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(showBlogs());
  }, []);

  const likesIncrementHandler = async (blogId, likes) => {
    dispatch(like(blogId, likes));
  };

  const removeBlogHandler = async (blog) => {
    dispatch(deleteBlog(blog));
  };

  return blogs?.length > 0 ? (
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
  ) : (
    <p>No blogs found</p>
  );
});

export default Blog;
