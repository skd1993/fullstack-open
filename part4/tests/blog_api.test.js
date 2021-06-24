const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
require('express-async-errors');
const config = require('../utils/config');
const logger = require('../utils/logger');
const mongo = require('../controllers/mongo');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const api = supertest(app);
let loginToken = '';

beforeAll(async () => {
  await mongo();
  await Blog.deleteMany({});
  console.log('Cleared');
});

describe('users-api', () => {
  describe('create a new user', () => {
    test('new user (root) is created successfully', async () => {
      const newUser = {
        name: 'Root user',
        username: 'root',
        blogs: [],
        password: 'sekret',
      };
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('username should have minimum length of 3', async () => {
      const newUser = {
        name: 'test',
        username: 'aa',
        blogs: [],
        password: 'test',
      };
      await api.post('/api/users').send(newUser).expect(400);
    });
    test('name should have minimum length of 3', async () => {
      const newUser = {
        name: 'aa',
        username: 'test',
        blogs: [],
        password: 'test',
      };
      await api.post('/api/users').send(newUser).expect(400);
    });
    test('creation fails if user is not unique', async () => {
      const newUser = {
        name: 'Root user',
        username: 'root',
        blogs: [],
        password: 'sekret',
      };
      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(res.body.error).toContain('`username` to be unique');
      const usersAtEnd = await helper.usersInDb();
      // expect(usersAtEnd).toHaveLength(usersAtStart.length);
      expect(usersAtEnd).toHaveLength(1);
    });
    test('new user is created and right password hash is stored', async () => {
      const password = 'testuser1';
      const newTestUser = {
        name: 'Test user 1',
        username: 'testuser1',
        blogs: [],
        password,
      };
      await api.post('/api/users').send(newTestUser);
      const usersList = await helper.usersInDb();
      const resUser = usersList.filter((user) => user.username === 'testuser1');
      const isPasswordCorrect = await bcrypt.compare(
        password,
        resUser[0].passwordHash
      );
      expect(isPasswordCorrect).toBe(true);
    });
    test('new user does not have any blogs', async () => {
      const usersList = await helper.usersInDb();
      const resUser = usersList.filter((user) => user.username === 'testuser1');
      expect(resUser[0].blogs).toHaveLength(0);
    });
  });
});

describe('login-api', () => {
  test('user cannot login with wrong username', async () => {
    const loginUser = {
      username: 'wrongusername',
      password: 'testuser1',
    };
    await api.post('/api/login').send(loginUser).expect(401);
  });
  test('user cannot login with wrong password', async () => {
    const loginUser = {
      username: 'testuser1',
      password: 'wrongpassword',
    };
    await api.post('/api/login').send(loginUser).expect(401);
  });
  test('a valid user can login, and get token in return', async () => {
    const loginUser = {
      username: 'testuser1',
      password: 'testuser1',
    };
    const loginRes = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    loginToken = loginRes.body.token;
    expect(loginRes.body).toHaveProperty('token');
  });
});

describe('blogs-test', () => {
  beforeAll(async () => {
    const blogsObject = helper.initBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogsObject.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

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

  describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
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

  describe('addition of a new blog', () => {
    test('a valid blog can be added with correct token', async () => {
      const newBlog = {
        title: 'Test Blog by testuser1',
        url: 'url69@test.com',
      };
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1);
      const contents = blogsAtEnd.map((r) => r.title);
      expect(contents).toContain('Test Blog by testuser1');
    });
    test('blog cannot be added with incorrect token', async () => {
      const newBlog = {
        title: 'Test Blog by testuser1',
        url: 'url69@test.com',
      };
      const tamperedToken = loginToken.slice(0, -1) + '!';
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tamperedToken}`)
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);
      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1);
    });
  });

  describe('user info', () => {
    test('user info contains blog details also', async () => {
      const newBlog = {
        title: 'Another Test Blog by testuser1',
        url: 'url70@test.com',
      };
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const users = await helper.usersInDb();
      const filteredUsers = users.filter((u) => u.username === 'testuser1');
      expect(filteredUsers[0].blogs).toHaveLength(2);

      //following can only be run if 'populate' is used for fetching from db in tests also
      // const titleList = filteredUsers[0].blogs.map((b) => b.title);
      // const urlList = filteredUsers.blogs.map((b) => b.url);
      // expect(idList).toContain('Another Test Blog by testuser1');
      // expect(urlList).toContain('url69@test.com');
    });
  });

  describe('deletion of a blog from db', () => {
    test('blog cannot be deleted without token', async () => {
      const blogsBefore = await helper.blogsInDb();
      const blogToDelete = blogsBefore[0];
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
      const blogsAfter = await helper.blogsInDb();
      expect(blogsAfter).toHaveLength(helper.initBlogs.length + 2);
    });
    test('blog cannot be deleted with another user token', async () => {
      const loginUser = {
        username: 'root',
        password: 'sekret',
      };
      const loginRes = await api.post('/api/login').send(loginUser).expect(200);
      const rootUserToken = loginRes.body.token;
      const blogsBefore = await helper.blogsInDb();
      const blogToDelete = blogsBefore[0];
      const res = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${rootUserToken}`)
        .expect(401);
      const blogsAfter = await helper.blogsInDb();
      expect(blogsAfter).toHaveLength(helper.initBlogs.length + 2); // one was added before
      expect(res.body.error).toContain('user mismatch/operation not permitted');
    });
    test('blog can be deleted with correct user token', async (done) => {
      const blogsBefore = await helper.blogsInDb();
      const blogToDelete = blogsBefore[2];
      console.log(blogToDelete);
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${loginToken}`)
        .expect(204)
        .end(done);
      const blogsAfter = await helper.blogsInDb();
      expect(blogsAfter).toHaveLength(helper.initBlogs.length + 1); // one was added before
    });
  });

  describe('property validations', () => {
    test('default number of likes is zero', async () => {
      const newBlog = {
        title: 'test blog - no likes given',
        url: 'url_no_likes@skd.com',
      };
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const blogsAfter = await helper.blogsInDb();
      const resContent = blogsAfter.filter(
        (blog) => blog.title === 'test blog - no likes given'
      );
      expect(resContent[0].likes).toEqual(0);
    });

    test('unique identifier property of blog is named id', async () => {
      const resToTest = await helper.blogsInDb();
      expect(resToTest[0]).toHaveProperty('id');
    });
  });

  afterAll((done) => done());
});

afterAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
  console.log('Blog and User cleared, connection closed');
});
