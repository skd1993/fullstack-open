import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { like } from '../redux/actions';

const BlogView = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [blog, setBlog] = useState();

  const fetchBlog = async () => {
    const res = await blogService.getBlogInfo(id);
    console.log(res);
    setBlog(res);
  };

  const likesIncrementHandler = async (blogId, likes) => {
    dispatch(like(blogId, likes));
    fetchBlog();
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return blog ? (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => likesIncrementHandler(blog.id, blog.likes)}>
          Like
        </button>
      </p>
      <p>added by {blog.author}</p>
    </div>
  ) : (
    <p>Not found</p>
  );
};

export default BlogView;
