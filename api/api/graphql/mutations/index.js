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
  addToFavorites,
  removeFromFavorites,
} = require('./JokeMutation');

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  createUser,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
};
