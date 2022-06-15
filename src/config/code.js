/**
 * @param {number} ttl, expiration time for generated code in redis datastore, its value is in seconds, it is optional, default is forever
 * @param {boolean} auth, if auth is required, else he will proceed to take email from req.query, it is optional, default is false
 * @param {number} codeBytesLengths, length in bytes for generated code, required
 */

const Config = {
    "verification": {
        ttl: 60,
        auth: true,
        codeBytesLengths: 64,
    },
    "passwordreset": {
        ttl: 1000 * 60 * 60,
        auth: false,
        codeBytesLengths: 64,
    }
}

module.exports = Config