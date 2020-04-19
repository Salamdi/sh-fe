const { Note } = require('./Note');
const { User } = require('./User');
const { Joke } = require('./Joke');

User.belongsToMany(Joke, {
  through: {
    model: 'UserJokes',
  },
});

Joke.belongsToMany(User, {
  through: {
    model: 'UserJokes',
  },
});

module.exports = {
  Note,
  User,
  Joke,
};
