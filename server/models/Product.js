const Sequelize = require('sequelize');
const db = require("../config/database");

const Product = db.define('products', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    productName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    Price: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

module.exports = Product;