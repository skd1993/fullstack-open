import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../redux/actions';

const BlogForm = ({ blogFormToggleRef, blogUpdateRef }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const buttonName = 'Create';

  const changeHandler = (event) => {
    const { value, name } = event.target;
    if (name === 'title') setTitle(value);
    else if (name === 'url') setUrl(value);
  };

  const blogSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(
      createBlog(title, url, setUrl, setTitle, blogUpdateRef, blogFormToggleRef)
    );
  };

  return (
    <div>
      <form onSubmit={blogSubmitHandler}>
        <h1>Create new blog</h1>
        <div>
          <label htmlFor={'title'}>Title: </label>
          <input
            type={'text'}
            name={'title'}
            placeholder={'title of blog post'}
            onChange={changeHandler}
            value={title}
            id={'title'}
          />
        </div>
        <div>
          <label htmlFor={'url'}>URL: </label>
          <input
            type={'text'}
            name={'url'}
            placeholder={'url of blog post'}
            onChange={changeHandler}
            value={url}
            id={'url'}
          />
        </div>
        <button type={'submit'} id='create-note'>
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
