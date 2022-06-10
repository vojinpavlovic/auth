const query = require("../startup/mysql");

const findUser = async ({email}) => {
    if (!email) {
        return { success: false, msg: "bad-request" }
    }

    const sql = "SELECT id, email_address, password, status, created_at FROM users WHERE email_address = ?"
    const params = [email]

    /* Querying result */
    const result = await query(sql, params)

    /* If result is null, there was an error (it will print in console) */
    if (!result) {
        return { success: false, msg: "internal-error" }
    }

    /* If query is ok but nothing found */
    if (result.length <= 0) {
        return { success: false, msg: "user-not-found" }
    }

    /* If there is result */

    return { success: true, msg: "user-found", result: result[0] }
}

module.exports = findUser