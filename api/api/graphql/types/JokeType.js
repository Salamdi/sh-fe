const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const JokeType = new GraphQLObjectType({
  name: 'Joke',
  description: 'This represents a Joke',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (joke) => joke.id,
    },
    joke: {
      type: GraphQLString,
      resolve: (joke) => joke.joke,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (joke) => joke.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (joke) => joke.updatedAt,
    },
  }),
});

module.exports = { JokeType };
