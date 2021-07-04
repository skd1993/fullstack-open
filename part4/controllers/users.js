const usersRouter = require('express').Router();
const User = require('../models/user');
require('express-async-errors');
const bcrypt = require('bcryptjs');

//creating a new user
usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const userToCreate = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await userToCreate.save();
  response.status(200).json(savedUser);
});

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs');
  if (users) response.status(200).json(users);
  else response.status(400).end();
});

module.exports = usersRouter;
