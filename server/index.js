if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const path = require("path");
const morgan = require("morgan");

const users = require("./model/user/user.mongo");

const { connectMongoDB } = require("./utils/mongo");
const { ApolloServer } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

async function startApolloServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
  }

  app.get("/", (re, res) => res.send("graphql server with express"));

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
    context: ({ req, res }) => ({ req, res }),
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  });

  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log("Running Graphql server...");
  });
}

startApolloServer();
