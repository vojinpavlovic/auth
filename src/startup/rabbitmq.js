/* Global libs */
const amqp = require("amqplib");

/* Local libs and vars */
const queues = require("../config/queues");
const amqpServer = process.env.AMQP_URL || "amqp://localhost:5673";
const connEmitter = require("../events/conn")
var connection, channel

module.exports = {

    /* RabbitMQ Connection */
    async connect() {
        try {
            connection = await amqp.connect(amqpServer)
            channel = await connection.createConfirmChannel();
            queues.map(queue => {
                channel.assertQueue(queue.name, queue.options)
                console.log(`RabbitMQ Queue asserted >> ${queue.name}, desc: ${queue.desc}`)
            });
            connEmitter.emit("rabbitmq-ready")
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    },


    /**
     * 
     * @param {string} queue Asserted queue that already exist
     * 
     * @param {*} data Data you wish to send to queue
     * 
     * @returns {boolean} Delivery status
     * 
    **/
    
    async sendToQueue(queue, data) {
        if (!queue) {
            return console.error("rabbitmq.js >> Queue is not defined")
        } 

        if (!data) {
            return console.error("rabbitmq.js >> data is not defined")
        }

        var msg

        if (typeof data == "object" || typeof data == "array") {
            msg = JSON.stringify(data)
        } else {
            msg = data
        }

        const delivered = await channel.sendToQueue(queue, Buffer.from(msg))

        return delivered
    }
}