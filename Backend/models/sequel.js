const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('wanunuzi_db', 'root', '', { dialect: 'mariadb' });

module.exports = { sequelize, DataTypes, Model };
