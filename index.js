require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./lib/config/app');
const rabbitmq = require('./lib/startup/rabbitmq')
const redis = require('./lib/startup/redis');
const router = require('./lib/startup/router');
const mysql = require('./lib/startup/mysql')

const port = process.env.PORT || 4000;
const nodeEnv = process.env.NODE_ENV || "development"

if (!config.allowedEnviornments.includes(nodeEnv)) {
    console.error(`Enviornment >> ${nodeEnv} << is not allowed!`)
    console.error(`Allowed enviornments are:`)
    console.error(config.allowedEnviornments)
    process.exit(1)
}

/* Express settings */
app.use(express.json());

/* Startup Processes*/
mysql.connect()
redis.initSession(app)
rabbitmq.connect();
router.establishRoutes(app)


if (process.env.NODE_ENV != "test") {
    app.listen(port, () => console.log([`Auth server is listening to ${port}`]))
} else {
    module.exports = app
}
