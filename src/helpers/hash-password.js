const bcrypt = require('bcrypt');

const hashedPassword = async (password) => {
    if (!password) {
        console.error("Error at hashPassword >> Password is not defined")
        return false
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
    } catch (error) {
        console.error(`Error at hashPassword >> ${error}`)

        return false
    }
}

module.exports = hashedPassword