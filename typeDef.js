const { gql } = require("apollo-server");

module.exports = gql`
  type File {
    filename: String!
    mimetype: String!
    path: String!
  }

  type Query {
    hello: String
    files: [File!]
  }

  type Mutation {
    uploadFile(file: Upload!): File
  }
`;
