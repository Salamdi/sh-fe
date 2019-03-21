const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'jokes';

const Joke = sequelize.define('Joke', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
  },
  joke: {
    type: Sequelize.TEXT,
  },
}, { tableName });

module.exports = { Joke };
