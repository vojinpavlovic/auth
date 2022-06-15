const config = require("../config/code")

const codeVerify = (req, res) => {
    const { type, code } = req.query

    /* If type or code does not exist */
    if (!type || !code) {
        res.status(400).end()
    }

    /* If such type does not exist in config */
    if (!config[type]) {
        res.status(400).end()
    }

    /* Redis Store lookup for code */
    
}

module.exports = codeVerify