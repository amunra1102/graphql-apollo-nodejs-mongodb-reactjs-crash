require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');

require('./helpers/init-mongo');

// Load schema & resolvers
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const mongoDataMethods = require('./helpers/methods-mongodb');

(async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })
  });

  await server.start();

  const app = express();

  // Additional middleware can be mounted at this point to run before Apollo.
  app.use(cors());

  // Mount Apollo middleware here.
  server.applyMiddleware({ app, path: '/specialUrl' });

  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
})();
