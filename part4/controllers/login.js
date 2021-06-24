const loginRouter = require('express').Router();
require('express-async-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username: username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }
  const userForToken = {
    username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  response.status(200).send({ token, username, name: user.name });
});

module.exports = loginRouter;
