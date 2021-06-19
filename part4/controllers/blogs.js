const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
require('express-async-errors');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({});
  if (blogs) response.status(200).json(blogs);
  else response.status(404).end();
});

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) response.status(200).json(blog);
  else response.status(404).end();
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndRemove(request.params.id);
  response.status(204).send('Deleted').end();
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  );
  if (updatedBlog.likes === request.body.likes) {
    console.log('Record updated');
    response.status(200).send('Updated Record');
  } else {
    console.log('Error updating');
    response.status(404).end();
  }
});

module.exports = blogsRouter;
