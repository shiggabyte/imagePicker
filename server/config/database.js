const { Sequelize } = require('sequelize');

module.exports = new Sequelize('image', 'postgres', 'Mesculentus1100', {
    host: 'localhost',
    dialect: 'postgres'
});

