// // const express = require("express");
// // const { ApolloServer, gql, UserInputError } = require("apollo-server-express");

// // var request = require("request").defaults({ encoding: null });

// // const typeDefs = gql`
// //   type User {
// //     name: String!
// //     password: String!
// //     email: String!
// //   }
// //   type Query {
// //     hello: String
// //     login(name: String!, password: String!): User!
// //   }
// //   type Mutation {
// //     register(name: String!, password: String!): User!
// //   }
// // `;

// // const resolvers = {
// //   Query: {
// //     hello: () => "Hello world!",
// //     login: (_, { name, password }) => {
// //       try {
// //         if (name.trim() === "") throw new UserInputError("Enter name");
// //         if (password.trim() === "") throw new UserInputError("Enter password");
// //         const data = {
// //           name: name,
// //           password: password,
// //         };
// //         return data;
// //       } catch (error) {
// //         throw error;
// //       }
// //     },
// //   },
// //   Mutation: {
// //     register: (_, { name, password }) => {
// //       try {
// //         if (name.trim() === "") throw new UserInputError("Enter name");
// //         if (password.trim() === "") throw new UserInputError("Enter password");
// //         const data = {
// //           name: name,
// //           password: password,
// //         };
// //         var sampleObject = {
// //           name: name,
// //           password: password,
// //         };

// //         fs.writeFile(
// //           "./object.json",
// //           JSON.stringify(sampleObject, null, 4),
// //           (err) => {
// //             if (err) {
// //               console.error(err);
// //               return;
// //             }
// //             console.log("File has been created");
// //           }
// //         );

// //         return data;
// //       } catch (error) {
// //         throw error;
// //       }
// //     },
// //   },
// // };

// // const server = new ApolloServer({ typeDefs, resolvers });

// // const app = express();
// // server.applyMiddleware({ app });

// // app.listen({ port: 5000 }, () =>
// //   console.log("Now browse to http://localhost:5000" + server.graphqlPath)
// // );

// // const storeUpload = ({ stream, filename }) =>
// //   new Promise((resolve, reject) =>
// //     stream
// //       .pipe(createWriteStream(filename))
// //       .on("finish", () => resolve())
// //       .on("error", reject)
// //   );

// // const resolvers = {
// //   Mutation: {
// //     uploadFile: async (parent, { file }) => {
// //       const { stream, filename } = await file;
// //       await storeUpload({ stream, filename });
// //       return true;
// //     },
// //   },
// // const { ApolloServer, gql } = require("apollo-server");
// // const fs = require("fs");
// // const path = require("path");
// // const typeDefs = gql`
// //   type File {
// //     filename: String!
// //     mimetype: String!
// //     encoding: String!
// //   }

// //   type Query {
// //     uploads: [File]
// //   }

// //   type Mutation {
// //     singleUpload(file: Upload!): File!
// //   }
// // `;

// // const resolvers = {
// //   Query: {
// //     uploads: (parent, args) => {},
// //   },

// //   Mutation: {
// //     singleUpload: async (parent, { file }) => {
// //       const { createReadStream, filename, mimetype, encoding } = await file;
// //       const strem = createReadStream();
// //       let { ext, name } = path.parse(filename);
// //       name = name.replace(/([^a-z0-9]+)/gi, "-").replace(" ", "_");
// //       console.log("name", name);
// //       let serverFile = path.join(
// //         __dirname,
// //         `./images/${name}-${Date.now()}${ext}`
// //       );
// //       console.log(serverFile, "serverFile");
// //       const is = strem;
// //       const os = fs.createWriteStream(serverFile);
// //       // console.log(is, "Connecter", os);
// //       is.pipe(os);
// //       console.log(this, "this");
// //       return this.success({
// //         name: "scene_pic_url",
// //         fileUrl: "http://127.0.0.1:4000" + filename,
// //       });

// //       // const writeStream = fs.createWriteStream(serverFile);
// //       // await createReadStream.pipe(writeStream);
// //       // return serverFile;
// //     },
// //   },
// // };

// // const server = new ApolloServer({
// //   typeDefs,
// //   resolvers,
// // });

// // server.listen().then(({ url }) => {
// //   console.log(`🚀 Server ready at ${url}`);
// // });

// const express = require("express");
// const { ApolloServer, gql } = require("apollo-server-express");
// const {
//   GraphQLUpload,
//   graphqlUploadExpress, // A Koa implementation is also exported.
// } = require("graphql-upload");
// const { finished } = require("stream-promise");

// const typeDefs = gql`
//   # The implementation for this scalar is provided by the
//   # 'GraphQLUpload' export from the 'graphql-upload' package
//   # in the resolver map below.
//   # scalar Upload

//   type File {
//     filename: String!
//     mimetype: String!
//     encoding: String!
//   }

//   type Query {
//     # This is only here to satisfy the requirement that at least one
//     # field be present within the 'Query' type.  This example does not
//     # demonstrate how to fetch uploads back.
//     otherFields: Boolean!
//   }

//   type Mutation {
//     # Multiple uploads are supported. See graphql-upload docs for details.
//     singleUpload(file: Upload!): File!
//   }
// `;

// const resolvers = {
//   // This maps the `Upload` scalar to the implementation provided
//   // by the `graphql-upload` package.
//   Upload: GraphQLUpload,

//   Mutation: {
//     singleUpload: async (parent, { file }) => {
//       const { createReadStream, filename, mimetype, encoding } = await file;

//       // Invoking the `createReadStream` will return a Readable Stream.
//       // See https://nodejs.org/api/stream.html#stream_readable_streams
//       const stream = createReadStream();

//       // This is purely for demonstration purposes and will overwrite the
//       // local-file-output.txt in the current working directory on EACH upload.
//       const out = require("fs").createWriteStream("local-file-output.txt");
//       stream.pipe(out);
//       await finished(out);

//       return { filename, mimetype, encoding };
//     },
//   },
// };

// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   await server.start();

//   const app = express();

//   // This middleware should be added before calling `applyMiddleware`.
//   app.use(graphqlUploadExpress());

//   server.applyMiddleware({ app });

//   await new Promise((r) => app.listen({ port: 4000 }, r));

//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }

// startServer();
