var path = require("path");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const { ApolloServer } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const { mongoConnect } = require("./services/mongo");
const PORT = 3000;

//****************************************************************************************************** */
async function startApolloServer() {
  const app = express();

  // Implement CORS
  app.use(cors());
  app.options("*", cors());

  app.enable("trust proxy");

  // Middleware to add security-related HTTP headers
  app.use(helmet());

  // Middleware to prevent cross-site scripting (XSS) attacks
  //   app.use(xssFilter());

  await mongoConnect();

  //******************************************************************************** */
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log("Running GraphQL server...");
  });
}

startApolloServer();
