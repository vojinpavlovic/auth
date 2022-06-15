require("dotenv").config();
const validate = require("../utils/register-validation");
const hashPassword = require("../helpers/hash-password");
const findUser = require("../sql/find-user");
const insertUser = require("../sql/insert-user");


const register = async (req, res) => {
    /* Check if inputs are valid */
    if (!validate(req.body)) {
        return res.status(400).end()
    }

    /* Check if such user by email exist */
    const { firstname, lastname, email, password } = req.body

    const user = await findUser({ email: email})
    
    if (user.success) {
        return res.status(200).json({
            success: false,
            msg: user.msg
        });
    }

    /* Hash Password */
    const hashedPassword = await hashPassword(password)

    if (!hashedPassword) res.status(500).end()

    /* Insert credentials to database */
    const newUser = await insertUser(email, hashedPassword, firstname, lastname) 

    /* If there is no success */
    if (!newUser.success) return res.status(500).end()
    
    /* Send verify email */

    /* Send successfull registration */
    res.status(201).json({
        success: true,
        msg: "successfull-registration"
    })
}

module.exports = register