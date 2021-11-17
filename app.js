const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDef");
const resolvers = require("./resolver");

// const your database configuration

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen()
    .then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
    .catch((err) => {
        console.log(err);
    });
// some change for git