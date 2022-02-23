import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../redux/actions';
import { Input, Button, Heading, Box, FormLabel } from '@chakra-ui/react';

const BlogForm = ({ blogFormToggleRef }) => {
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
    dispatch(createBlog(title, url, setUrl, setTitle, blogFormToggleRef));
  };

  return (
    <div>
      <form onSubmit={blogSubmitHandler}>
        <Heading size={'xs'} mb={2}>Create new blog</Heading>
        <Box mb={2}>
          {/* <FormLabel htmlFor={'title'}>Title: </FormLabel> */}
          <Input
            type={'text'}
            name={'title'}
            placeholder={'Title of blog post'}
            onChange={changeHandler}
            value={title}
            id={'title'}
          />
        </Box>
        <Box mb={2}>
          {/* <FormLabel htmlFor={'url'}>URL: </FormLabel> */}
          <Input
            type={'text'}
            name={'url'}
            placeholder={'URL of blog post'}
            onChange={changeHandler}
            value={url}
            id={'url'}
          />
        </Box>
        <Box mb={2}>
          <Button type={'submit'} id='create-note' isFullWidth={true} colorScheme='blue'>
            {buttonName}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default BlogForm;
