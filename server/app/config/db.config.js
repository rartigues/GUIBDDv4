require('dotenv').config();

module.exports = {
    HOST: process.env.host,
    USER: process.env.user,
    PASSWD: process.env.password,
    DB: process.env.database,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000
    }
};