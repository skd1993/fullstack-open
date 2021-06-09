const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length == 0) return 0;
  const reducer = (sum, blog) => blog.likes + sum;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length == 0) return {};
  let res = { max: 0, blog: {} };
  blogs.forEach((blog) => {
    if (blog.likes > res.max) {
      res.max = blog.likes;
      res.blog = blog;
    }
  });
  return {
    title: res.blog.title,
    author: res.blog.author,
    likes: res.blog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length == 0) return 'Empty Blog List';
  const attrArray = _.map(blogs, 'author');
  const res = _.chain(attrArray).countBy().toPairs().max(_.last).value();
  return {
    author: res[0],
    blogs: res[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length == 0) return 'Empty Blog List';
  const res = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();
  return _.maxBy(res, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
