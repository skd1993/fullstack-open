const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('./schema');
const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

console.log('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log('cannot connect to mongodb', error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
