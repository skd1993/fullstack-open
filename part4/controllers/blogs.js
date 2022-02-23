const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
require('express-async-errors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
    id: 1,
  });
  if (blogs) response.status(200).json(blogs);
  else response.status(404).end();
});

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) response.status(200).json(blog);
  else response.status(404).end();
});

blogsRouter.delete('/:id', async (request, response, next) => {
  // const decodeToken = jwt.verify(request.token, process.env.SECRET);
  // if (!request.token || !decodeToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' });
  // }
  // const user = await User.findById(decodeToken.id);
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (user && blog && user.id.toString() === blog.user.toString()) {
    await Blog.remove(blog);
    response.status(204).send('Deleted').end();
  } else
    response
      .status(401)
      .json({ error: 'user mismatch/operation not permitted' });
});

blogsRouter.post('/', async (request, response, next) => {
  // const decodeToken = jwt.verify(request.token, process.env.SECRET);
  // if (!request.token || !decodeToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' });
  // }
  const { title, url } = request.body;
  // const user = await User.findById(decodeToken.id);
  const user = request.user;
  if (user) {
    const blog = new Blog({
      title,
      author: `${user.name} (${user.username})`,
      url,
      user: user._id,
    });
    // logger.info(JSON.stringify({
    //   title,
    //   author: `${user.name} (${user.username})`,
    //   url,
    //   user: user._id,
    // }));
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } else {
    response
      .status(401)
      .json({ error: 'User is missing, token no more valid' });
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  );
  if (updatedBlog.likes === request.body.likes) {
    console.log('Record updated');
    response.status(200).send('Updated Record, liked');
  } else {
    console.log('Error updating like');
    response.status(404).end();
  }
});

blogsRouter.put('/comment/:id', async (request, response, next) => {
  const toBeUpdated = await Blog.findById(request.params.id);
  if (toBeUpdated) {
    const newComments = [...toBeUpdated.comments, request.body.comment];
    await toBeUpdated.updateOne(
      { comments: newComments },
      function (err, docs) {
        if (err) {
          console.log('Error updating comment');
          response.status(404).end();
        } else {
          console.log('Updated User : ', docs);
          console.log('Record updated');
          response.status(200).send('Updated Record, comment inserted');
        }
      }
    );
  }
});

module.exports = blogsRouter;
