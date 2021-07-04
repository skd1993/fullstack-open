const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');

const initBlogs = [
  {
    likes: 21,
    title: 'Test Blog A',
    author: 'Test user A (testuserA)',
    url: 'test@test.com',
    user: mongoose.Types.ObjectId('578df3efb618f5141202a196'),
  },
  {
    likes: 31,
    title: 'Test Blog B',
    author: 'Test user B (testuserB)',
    url: 'test@test.com',
    user: mongoose.Types.ObjectId('578df3efb618f5141202a197'),
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Test Blog 0',
    url: 'url69@test.com',
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
