require("dotenv").config()
var Config = {}

if (process.env.NODE_ENV == "production") {
    Config = {
        connectionLimit: process.env.DB_PROD_CONN_LIMIT,
        host: process.env.DB_PROD_HOST,
        port: process.env.DB_PROD_PORT,
        user: process.env.DB_PROD_USER,
        password: process.env.DB_PROD_PASSWORD,
        database: process.env.DB_PROD_DATABASE
    }
} else if (process.env.NODE_ENV == "development") {
    Config = {
        connectionLimit: process.env.DB_DEV_CONN_LIMIT,
        host: process.env.DB_DEV_HOST,
        port: process.env.DB_DEV_PORT,
        user: process.env.DB_DEV_USER,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_DATABASE
    }
} else if (process.env.NODE_ENV == "test") {
    Config = {
        connectionLimit: process.env.DB_TEST_CONN_LIMIT,
        host: process.env.DB_TEST_HOST,
        port: process.env.DB_TEST_PORT,
        user: process.env.DB_TEST_USER,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DB_TEST_DATABASE
    }
}

module.exports = Config