const validator = require('validator')
const hashPassword = require("../helpers/hash-password");
const updateUser = require('../sql/update-user')
const { get, del } = require("../startup/redis")

const passReset = async (req, res) => {
    const { code, email, password, confirmPassword } = req.query

    /* If inputs are not found */
    if (!code || !email || !password || !confirmPassword) {
        return res.status(400).end()
    }

    /* Check if password is strong */
    if (!validator.isStrongPassword(password)) {
        return res.status(400).end()
    }

    /* Check if password is confirmed */
    if (password != confirmPassword) {
        return res.status(400).end()
    }

    /* Lookup for code in Redis */
    const result = await get(`passwordreset:${email}`)

    /* If nothing is found in Redis */
    if (!result) {
        return res.status(400).end()
    }

    /* If code is found but not same */
    if (code !== result) {
        return res.status(400).end()
    }

    /* Hashing password */
    const hashedPassword = await hashPassword(password)

    /* Check if password is not hashed successfully */
    if (!hashedPassword) res.status(500).end()

    /* Update user with hashed password */
    const data = {
        email: email,
        columns: {
            password: hashedPassword
        }
    }

    const query = await updateUser(data)
    /* Check if user is not updated */
    if (!query.success) {
        return res.status(500).end()
    }

    /* Delete code */
    del(`passwordreset:${email}`)

    /* Send changed password email */

    /* Return successfull response */
    res.status(200).json({
        success: true,
        msg: "new-password"
    })
}

module.exports = passReset