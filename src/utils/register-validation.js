const validator = require("validator")

module.exports = (body) => {
    const { firstname, lastname, email, password, confirmPassword } = body

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
        return false
    }

    if (!validator.isEmail(email)) {
        return false
    }

    if (!validator.isStrongPassword(password)) {
        return false
    }

    if (password != confirmPassword) {
        return false
    }

    return true
}