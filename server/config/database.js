const { Sequelize } = require('sequelize');

const db = new Sequelize('image', 'postgres', null, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db; 
