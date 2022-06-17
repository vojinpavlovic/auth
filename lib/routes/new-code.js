const config = require("../config/code")
const { set } = require("../startup/redis")
const randomString = require("../utils/random-string")

const newCode = async (req, res) => {
    /* Get type of code */
    const { type } = req.query 

    /* Check if type is in config */
    if (!config[type]) {
        return res.status(400).end()
    }

    const conf = config[type]
    var email_address = ''
    
    /* Check if auth is required */
    if (conf.auth) {
        if (!req.session.userData) {
            return res.status(403).end() // Return forbidden status
        }

        email_address = req.session.userData.email
    } else {
        /* If auth is not required */
        const { email } = req.query
        
        if (!email) {
            return res.status(400).end()
        }

        email_address = email
    }

    /* Generate new random string */
    const generatedCode = randomString(conf.codeBytesLengths);

    /* Set in redis store */
    var hasSetted = false

    if (conf.ttl) {
        hasSetted = await set(`${type}:${email_address}`, generatedCode, conf.ttl)
    } else {
        hasSetted = await set(`${type}:${email_address}`, generatedCode)
    }

    /* Check if code has been setted */
    if (hasSetted == "OK") {
        /* Send to mail queue */
        
        console.log(generatedCode)
        return res.status(201).json({
            success: true,
            msg: "new-code",
        })
    }

    /* If redis has not setted it send 500 error */
    res.status(500).send()
}

module.exports = newCode