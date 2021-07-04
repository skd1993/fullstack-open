import React from 'react';
import Togglable from './Togglable';

const BlogContent = ({ blog, likesIncrementHandler, removeBlogHandler }) => {
  return (
    <div key={blog.id} style={{ border: '1px solid black', padding: '10px' }}>
      <div className={'blogTitle'}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          {blog.title}
        </span>{' '}
        {blog.author}
      </div>
      <Togglable buttonName={'View'} cancelButtonName={'Hide'}>
        <div className={'blogDetails'}>
          <p>URL: {blog.url}</p>
          <div>
            <span>Likes: {blog.likes} </span>
            <button onClick={() => likesIncrementHandler(blog.id, blog.likes)}>
              Like
            </button>
          </div>
          <button onClick={() => removeBlogHandler(blog)}>Remove</button>
        </div>
      </Togglable>
    </div>
  );
};

export default BlogContent;
