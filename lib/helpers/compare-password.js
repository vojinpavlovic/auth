const bcrypt = require('bcrypt');

const comparePassword = async (entered, password) => {
    if (!entered || !password) {
        return false
    }

    try {
        const passwordMatch = await bcrypt.compare(entered, password)

        if (passwordMatch) return true

        return false
    } catch(error) {
        console.log(`Error at comparePassword >> ${error}`)

        return null
    }
}

module.exports = comparePassword