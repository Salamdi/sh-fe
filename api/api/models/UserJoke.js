const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'UserJoke';

const UserJoke = sequelize.define('UserJoke', {}, { tableName });
