require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const rabbitmq = require('./src/startup/rabbitmq')

app.use(express.json());

/* Startup Processes*/
rabbitmq.connect();

/*
setTimeout(() => {
    for (let index = 0; index < 5000; index++) {
        rabbitmq.sendToQueue("new-user", {})    
    }
}, 5000);
*/

require('./src/startup/redis-sessions')(app);
require('./src/startup/router')(app);
require('./src/startup/mysql');

/* Listener */
app.listen(port, () => console.log([`Auth server is listening to ${port}`]));