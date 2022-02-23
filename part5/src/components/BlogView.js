import React, { useEffect, useState, useRef } from 'react';
import blogService from '../services/blogs';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { like, comment } from '../redux/actions';

const BlogView = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [blog, setBlog] = useState();
  const commentRef = useRef();

  const fetchBlog = async () => {
    const res = await blogService.getBlogInfo(id);
    // console.log(res);
    setBlog(res);
  };

  const likesIncrementHandler = (blogId, likes) => {
    dispatch(like(blogId, likes));
    fetchBlog();
  };

  const commentSubmitHandler = (blogId) => {
    dispatch(comment(blogId, commentRef.current.value));
    commentRef.current.value = '';
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
      <div>
        <h2>comments</h2>
        <input
          placeholder='insert comment here'
          name='comment'
          ref={commentRef}
        />
        <button onClick={() => commentSubmitHandler(blog.id)}>Submit</button>
        {!blog.comments || blog.comments.length === 0 ? (
          <p>No comments yet ...</p>
        ) : (
          <ul>
            {blog?.comments.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  ) : (
    <p>Not found</p>
  );
};

export default BlogView;
