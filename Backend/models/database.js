const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wanunuzi_db', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

module.exports = sequelize;
