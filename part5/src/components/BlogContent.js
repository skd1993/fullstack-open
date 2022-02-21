import React from 'react';
import { Link } from 'react-router-dom';
// import Togglable from './Togglable';

const BlogContent = ({
  blog,
  removeBlogHandler,
  index,
}) => {
  return (
    <div key={blog.id} style={{ border: '1px solid black', padding: '10px' }}>
      <div className={'blogTitle'}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </span>{' '}
        <p>by {blog.author}</p>
      </div>
      {/* <Togglable buttonName={'View'} cancelButtonName={'Hide'}>
        <div className={'blogDetails'}>
          <p>URL: {blog.url}</p>
          <div id={`like-div-${index + 1}`}>
            <span>Likes: {blog.likes} </span>
            <button
              id={`like-button-${index + 1}`}
              onClick={() => likesIncrementHandler(blog.id, blog.likes)}
            >
              Like
            </button>
          </div>
          <button id='remove-button' onClick={() => removeBlogHandler(blog)}>
            Remove
          </button>
        </div>
      </Togglable> */}
    </div>
  );
};

export default BlogContent;
