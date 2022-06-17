const updateUser = require('../sql/update-user')

const verifyUser = async ({email}) => {
    if (!email) return

    const data = {
        email: email,
        columns: {
            status: "active"
        }
    }

    const result = await updateUser(data)

    if (!result.success) {
        return { success: false, msg: 'not-verified' }
    }

    return { success: true, msg: "user-verified" }
}

module.exports = verifyUser