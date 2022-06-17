const { query } = require("../startup/mysql")

const insertUser = async(email, password, firstname, lastname) => {
    if (!email || !password || !firstname || !lastname) {
        return { success: false, msg: "bad-request" }
    }

    const sql = "INSERT INTO users SET email_address = ?, password = ?, first_name = ?, last_name = ?"
    const params = [email, password, firstname, lastname]

    /* Querying result */
    const result = await query(sql, params)

    /* If result is null, there was an error (it will print in console) */
    if (!result) {
        return { success: false, msg: "internal-error" }
    }

    const { affectedRows } = result

    if (affectedRows <= 0) {
        return { success: false, msg: "nothing-has-inserted" }
    }

    return { success: true, msg: "user-inserted", data: result.insertId }
}

module.exports = insertUser