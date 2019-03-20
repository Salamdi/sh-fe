const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const {JokeType} = require('../types');
const {User, Joke} = require('../../models');

const addToFavorites = {
  type: JokeType,
  description: 'The mutation that allows you to add a Joke to user\' favorite list' ,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    joke: {
      name: 'joke',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (value, {id, userId, joke}) => {
    const user = await User.findByPk(userId);
    const {length: count} = await user.getJokes();
    if (count === 10) {
      throw new Error('limit of 10 jokes is exceeded');
    }
    const [newJoke, created] = await Joke.findOrCreate({where: {id}, defaults: {joke}});
    user.addJoke(newJoke);
    return newJoke;
  },
};

const removeFromFavorites = {
  type: JokeType,
  description: 'The mutation that sllows you to remove a joke from user\' favorite list',
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
  resolve: async (value, {userId, id}) => {
    const user = await User.findByPk(userId);
    await user.removeJoke(id);
    const joke = await Joke.findByPk(id);
    const {length: count} = await joke.getUsers();
    if (count === 0) {
      await Joke.destroy({where: {id}});
    }
    return joke;
  }
}

module.exports = {
  addToFavorites,
  removeFromFavorites,
}
