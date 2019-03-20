const {
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { JokeType } = require('../types');
const { User } = require('../../models');

const jokeQuery = {
  type: new GraphQLList(JokeType),
  args: {
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
  },
  resolve: async (_, { userId }) => {
    const user = await User.findByPk(userId);
    const jokes = await user.getJokes();
    return jokes;
  },
};

module.exports = { jokeQuery };
