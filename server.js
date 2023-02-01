// @collapse
var path = require("path");
const express = require("express");

const { ApolloServer } = require("apollo-server-express");
const helmet = require("helmet");

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

  app.use(helmet());

  await mongoConnect();

  //******************************************************************************** */
  const schema = makeExecutableSchema({
    // typeDefs: [...typesArray, {scalar Date}],
    // resolvers: [...resolversArray, { Date: dateScalar }],
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

startApolloServer();
