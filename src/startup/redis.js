require("dotenv").config();
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const sessionOptions = require("../config/session");

/* Making redis store client connection */
const url = process.env.REDIS_URL || "127.0.0.1", port = process.env.REDIS_PORT || 6379, pass = process.env.REDIS_PASS || ""

const redisClient = redis.createClient({
    url:`redis://${url}:${port}`,
    legacyMode: true // Without this, request hangs when checking session
});

var reconnecting = false, counter = 0, maxCounter = 50
/* Connect to redis client */
redisClient.connect()

/* 
    Using command to authenticate upon connection 
    This is temporary solution, later it will be reconstructed with ACLs
*/

/* Events */
redisClient.on("error", (err) => {
    if (counter == 0) {
        reconnecting = true
        console.log("Redis connect error >> " + err)
        return counter ++
    }

    if (!reconnecting) {
        return counter = 0
    }

    if (counter < maxCounter) {
        console.log(`Reconnecting to Redis CLI ${counter}/${maxCounter}`)
        counter ++ 
    }

    if (counter >= maxCounter) {
        console.error("Redis CLI failed to reconnect")
        process.exit(1)
    }
});

redisClient.on("connect", (err) => {
    if (err) throw err
    
    if (reconnecting) {
        console.log("Redis CLI successfully reconnected")
        reconnecting = false
    }
})

redisClient.on("ready", () => {
    redisClient.sendCommand(['auth', pass])
    console.log(["Redis Client is Ready"]);
});

/* Initialise session */
const store = new RedisStore({ client: redisClient })
const sess = session(sessionOptions(store))

/* Export */
module.exports = {
    async get(key) {
        const promise = new Promise((resolve, reject) => {
            redisClient.get(key, (err, reply) => {
                if (err) {
                    return reject(err)
                }

                resolve(reply)
            })
        })

        return promise.then(res => res).catch(err => err)
    },

    set(key, val, ttl) {
        const promise = new Promise((resolve, reject) => {
            if (ttl) {
                redisClient.set(key, val, "EX", ttl, (err, reply) => {
                    if (err) return reject(err)
                    resolve(reply)
                })
            } else {
                redisClient.set(key, val, (err, reply) => {
                    if (err) return reject(err)
                    resolve(reply)
                }) 
            }
        })

        return promise.then(res => res).catch(err => err)
    },

    initSession(app) {
        app.use(sess)
    },
}
