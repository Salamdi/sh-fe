const { Note } = require('./Note');
const { User } = require('./User');
const { Joke } = require('./Joke');
// const { UserJoke } = require('./UserJoke');

User.belongsToMany(Joke, {
  through: {
    model: 'UserJoke'
  }
});

Joke.belongsToMany(User, {
  through: {
    model: 'UserJoke'
  }
})

module.exports = {
  Note,
  User,
  Joke,
};
