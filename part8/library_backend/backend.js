const {ApolloServer} = require('@apollo/server');
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const typeDefs = require('./schema');
const User = require('./models/User');
const resolvers = require('./resolvers');
const http = require('http');
const {expressMiddleware} = require('@apollo/server/express4');

db.connect();

const start = async () => {
  const app = express();
  const httpServer = http.createServer();

  const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
          );

          const currentUser = await User.findById(decodedToken.id);
          return {currentUser};
        }
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  })
};

start();