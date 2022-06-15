require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const rabbitmq = require('./src/startup/rabbitmq')
const { initSession } = require('./src/startup/redis');

app.use(express.json());

/* Startup Processes*/
rabbitmq.connect();
initSession(app)

require('./src/startup/router')(app);
require('./src/startup/mysql');

/* Listener */
app.listen(port, () => console.log([`Auth server is listening to ${port}`]));