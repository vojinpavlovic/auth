var Config = {}

if (process.env.NODE_ENV == 'production') {
    Config = {
        url: process.env.REDIS_PROD_URL || "127.0.0.1",
        port: process.env.REDIS_PROD_PORT || 6379,
        pass: process.env.REDIS_PROD_PASS || "",
        db: process.env.REDIS_PROD_DB || 1
    }
}

if (process.env.NODE_ENV == 'development') {
    Config = {
        url: process.env.REDIS_DEV_URL || "127.0.0.1",
        port: process.env.REDIS_DEV_PORT || 6379,
        pass: process.env.REDIS_DEV_PASS || "",
        db: process.env.REDIS_DEV_DB || 2
    }
}

if (process.env.NODE_ENV == 'test') {
    Config = {
        url: process.env.REDIS_TEST_URL || "127.0.0.1",
        port: process.env.REDIS_TEST_PORT || 6379,
        pass: process.env.REDIS_TEST_PASS || "",
        db: process.env.REDIS_TEST_DB || 3
    }
}

module.exports = Config