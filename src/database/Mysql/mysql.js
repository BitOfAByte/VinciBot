const { Sequelize } = require('sequelize');
const config = require('../../../config.json');

module.exports = new Sequelize(config.mysql.name, config.mysql.username, config.mysql.password, {
    dialect: 'mysql',
    host: config.mysql.host
});

