require("dotenv").config();
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const sessionOptions = require("../config/session");

/* Making redis store client connection */
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || "",
    legacyMode: true
});

/* Connect to redis client */
redisClient.connect()

/* Events */
redisClient.on("error", (err) => {
    console.log(`Redis Connection has been failed ${err}`);
    process.exit(1) // Exit the process
});

redisClient.on("connect", (err) => {
    if (err) throw err
})

redisClient.on("ready", () => {
    console.log(["Redis Client is Ready"]);
});

/* Initialise session */
const store = new RedisStore({ client: redisClient })
const sess = session(sessionOptions(store))

/* Export */
module.exports = (app) => app.use(sess)
