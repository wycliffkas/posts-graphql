const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  input PostInput {
    title: String!
    content: String!
  }

  type Query {
    getPost(id: ID!): Post
    getAllPosts: [Post]
  }

  type Mutation {
    addPost(input: PostInput): Post
    deletePost(id: ID!): String
  }
`);

module.exports = schema;