const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
require('express-async-errors');
const config = require('../utils/config');
const logger = require('../utils/logger');
const mongo = require('../controllers/mongo');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeAll(async () => {
  await mongo();
  await Blog.deleteMany({});
  console.log('Cleared');
  const blogsObject = helper.initBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogsObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('blogs-test', () => {
  describe('when initially some blogs are saved in db', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('there are initially 2 blogs in test db', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(helper.initBlogs.length);
    });
  });

  describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
      const blogs = await helper.blogsInDb();
      const blogToView = blogs[0];

      const fetchedBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const processedBlog = JSON.parse(JSON.stringify(blogToView));
      expect(fetchedBlog.body).toEqual(processedBlog);
    });

    test('fails with status 400 if id is not valid/does not exist', async () => {
      const validNonExistingId = helper.nonExistingId();
      await api.get(`/api/blogs/${validNonExistingId}`).expect(400);
    });
  });

  describe('addition of a valid new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'test blog 00',
        author: 'SKD',
        url: 'url3@skd.com',
        likes: 30,
      };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1);
      const contents = blogsAtEnd.map((r) => r.title);
      expect(contents).toContain('test blog 00');
    });
  });

  describe('deletion of a valid blog from db', () => {
    test('a note can be deleted', async () => {
      const blogsBefore = await helper.blogsInDb();
      const blogToView = blogsBefore[0];

      await api.delete(`/api/blogs/${blogToView.id}`).expect(204);

      const blogsAfter = await helper.blogsInDb();
      expect(blogsAfter).toHaveLength(helper.initBlogs.length + 1 - 1);
    });
  });

  describe('property validations', () => {
    test('default number of likes is zero', async () => {
      const newBlog = {
        title: 'test blog - no likes given',
        author: 'SKD',
        url: 'url_no_likes@skd.com',
      };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const blogsAfter = await helper.blogsInDb();
      const resContent = blogsAfter.filter(
        (blog) => blog.title === 'test blog - no likes given'
      );
      expect(resContent[0].likes).toEqual(0);
    });

    test('title and url are mandatory', async () => {
      const newBlog = {
        author: 'SKD',
        likes: 30,
      };
      await api.post('/api/blogs').send(newBlog).expect(400);
    });

    test('unique identifier property of blog is named id', async () => {
      const resToTest = await helper.blogsInDb();
      expect(resToTest[0]).toHaveProperty('id');
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
