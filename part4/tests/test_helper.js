const Blog = require('../models/blog');

const initBlogs = [
  { title: 'test blog 1', author: 'SKD', url: 'url1@skd.com', likes: 10 },
  { title: 'test blog 2', author: 'SKD', url: 'url2@skd.com', likes: 20 },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'test blog 69',
    author: 'SKD',
    url: 'url69@skd.com',
    likes: 69,
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initBlogs,
  nonExistingId,
  blogsInDb,
};
