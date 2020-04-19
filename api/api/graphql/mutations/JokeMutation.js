const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const { JokeType } = require('../types');
const { User, Joke } = require('../../models');

const createJoke = {
  type: JokeType,
  description: 'Creates Joke',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    joke: {
      name: 'joke',
      type: new GraphQLNonNull(GraphQLString),
    },
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  async resolve(_, { id, userId, joke }) {
    const user = await User.findByPk(userId);
    const jokesCount = await user.countJokes();
    if (jokesCount > 9) {
      throw new Error('You have reached maximum amount of favorite jokes');
    }
    const [ dbJoke, created ] = await Joke.findOrCreate({
      where: { id },
      defaults: { joke },
    });
    await dbJoke.addUser(userId);
  }
}

const removeFromFavorites = {
  type: JokeType,
  description: 'Removes a joke from favs',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (value, { userId, id }) => {
    const joke = await Joke.findByPk(id);
    if (joke) {
      await joke.removeUser(userId);
    }
  },
};

module.exports = {
  removeFromFavorites,
  createJoke,
};
