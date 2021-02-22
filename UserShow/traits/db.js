const Sequelize = require('sequelize');

const dbSchema = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD || null;

const sequelize = new Sequelize(dbSchema, dbUser, dbPassword, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 20000,
        idle: 10000
    }
});

module.exports = {
    'Sequelize': Sequelize,
    'sequelize': sequelize
};