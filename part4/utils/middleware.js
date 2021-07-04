const logger = require('./logger');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' });
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
};

const getToken = (request, response, next) => {
  const authorizarion = request.get('authorization');
  if (authorizarion && authorizarion.toLowerCase().startsWith('bearer ')) {
    request.token = authorizarion.substring(7);
    // logger.info('Set token as =====', request.token);
  } else request.token = null;
  next();
};

const getUser = async (request, response, next) => {
  if (request.token !== null) {
    const decodeToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodeToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodeToken.id);
    request.user = user;
    // logger.info('Set user as =====', request.user);
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getToken,
  getUser,
};
