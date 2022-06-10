const validator = require("validator")

module.exports = (body) => {
    const { email, password } = body

    if (!email || !password) {
        return false
    }

    if (!validator.isEmail(email)) {
        return false
    }

    return true
}