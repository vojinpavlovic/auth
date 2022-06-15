require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const rabbitmq = require('./src/startup/rabbitmq')
const { initSession } = require('./src/startup/redis');
const connEvents = require('./src/events/conn')

/* Express settings */
app.use(express.json());

/* Startup Processes*/
initSession(app)
rabbitmq.connect();
require('./src/startup/router')(app);
require('./src/startup/mysql');

/* Handling connections */
var connections = {
    mysql: false,
    redis: false,
    rabbitmq: false
}

connEvents.on("mysql-ready", () => {
    connections["mysql"] = true
    console.log(["Connection with MySQL has been established"])
})

connEvents.on("redis-ready", () => {
    connections["redis"] = true
    console.log(["Redis Client is Ready"]);
})

connEvents.on("rabbitmq-ready", () => {
    connections["rabbitmq"] = true
    console.log(["AMQP Server has been established"])
})

/* Listener */

const listener = () => {
    const tryLaunch = setInterval(() => {
        var doLaunch = true
        
        for (const key in connections) {
            const connection = connections[key]
            if (!connection) {
                doLaunch = false
            }
        }
    
        if (doLaunch) {
            clearInterval(tryLaunch)
            app.listen(port, () => console.log([`Auth server is listening to ${port}`]))
            return app
        }
    }, 500);   
}

if (process.env.NODE_ENV != "test") {
    listener()
} else {
    module.exports = app
}
