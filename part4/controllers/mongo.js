const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');
require('dotenv').config();

const mongoUrl = config.MONGODB_URI;
logger.info('URI in use', mongoUrl);

module.exports = async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  logger.info('Connected to MongoDB URI ===', mongoUrl);
  return mongoose;
};
