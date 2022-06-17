const config = require("../config/code")
const { get, del } = require("../startup/redis")

const codeVerify = async (req, res) => {
    const { type, email, code } = req.query

    /* If type, email or code does not exist */
    if (!type || !email || !code) {
        res.status(400).end()
    }

    /* If such type does not exist in config */
    if (!config[type]) {
        res.status(400).end()
    }

    /* Redis Store lookup for code */
    const result = await get(`${type}:${email}`)
    
    /* If nothing is found in Redis */
    if (!result) {
        return res.status(400).end()
    }

    /* If code is found but not same */
    if (code !== result) {
        return res.status(400).end()
    }

    /* Once code is verified, handle it if handler exist */
    if (config[type].handler) {
        const handlerRes = await config[type].handler({ type: type, email: email, code: email })
        
        if (!handlerRes.success) {
            return res.status(400).end()
        }

        if (handlerRes.success) {

            if (config[type].delAfterHandling) {
                del(`${type}:${email}`)
            }

            return res.status(200).json(handlerRes)
        }
    }

    /* Send successfull response */
    res.status(200).json({
        success: false,
        msg: 'code-valid'
    })
}

module.exports = codeVerify