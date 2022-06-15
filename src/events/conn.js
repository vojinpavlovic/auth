const events = require('events')

const emitter = new events.EventEmitter()

emitter.addListener("mysql-ready", () => {
    console.log(">> Listener mysql-ready is added <<")
})

emitter.addListener("redis-ready", () => {
    console.log(">> Listener redis-ready is added <<")
})

emitter.addListener("rabbitmq-ready", () => {
    console.log(">> Listener rabbitmq-ready is added <<")
})


module.exports = emitter