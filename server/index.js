const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const rootValue = require("./graphql/resolvers");
const cors = require('cors');

let posts = [];

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("GraphQL server running on http://localhost:4000/graphql");
});
