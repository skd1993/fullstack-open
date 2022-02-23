import React from 'react';
import { Link } from 'react-router-dom';
// import Togglable from './Togglable';
import { Box, Heading, Text } from '@chakra-ui/react';

const BlogContent = ({
  blog,
  removeBlogHandler,
  index,
}) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
    <Box key={blog.id} borderWidth='1px' borderRadius='lg' p={4} mb={3}>
      <div className={'blogTitle'}>
        <Heading size='md'>
          {blog.title}
        </Heading>
        <Text fontSize='sm' color='gray'>by {blog.author}</Text>
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
    </Box>
    </Link>
  );
};

export default BlogContent;
