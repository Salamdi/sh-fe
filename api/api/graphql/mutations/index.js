const {
  createNote,
  updateNote,
  deleteNote,
} = require('./NoteMutation');
const {
  createUser,
  updateUser,
  deleteUser,
} = require('./UserMutation');
const {
  removeFromFavorites,
  createJoke,
} = require('./JokeMutation');

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  createUser,
  updateUser,
  deleteUser,
  removeFromFavorites,
  createJoke,
};
