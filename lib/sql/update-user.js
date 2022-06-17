const { query } = require("../startup/mysql")

const updateUser = async (data) => {
    if (!data) {
        return false
    }

    const { id, email, columns } = data

    if (!id && !email || !columns) {
        return false
    }

    var sqlSet = '', params = [], counter = 1

    /* Iterating and concating strings */
    for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
            if (counter == Object.keys(columns).length) {
                sqlSet += `${key} = ? ` // Concating without -> , <- on the end
                params.push(columns[key])
                break // In case length is 1, we dont want to reappend
            }

            sqlSet += `${key} = ?, ` // Concating with -> , <- on the end
            params.push(columns[key])
            counter ++;
        }         
    }

    /* If user ID is provided */
    if (id && !email) {
        var sql = `UPDATE users SET ${sqlSet} WHERE id = ?`
        params.push(id)
    }

    /* If user email is provided */
    if (!id && email) {
        var sql = `UPDATE users SET ${sqlSet} WHERE email_address = ?`
        params.push(email)
    }

    /* Querying result */
    const result = await query(sql, params)

    /* If result is null, there was an error (it will print in console) */
    if (!result) {
        return { success: false, msg: "internal-error" }
    }

    const { changedRows } = result

    if (changedRows <= 0) {
        return { success: false, msg: "nothing-has-changed" }
    }

    return { success: true, msg: "user-updated"}
}

module.exports = updateUser