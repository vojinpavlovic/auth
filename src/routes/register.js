const hashPassword = require("../helpers/hash-password");
const validate = require("../utils/register-validation");
const findUser = require("../controllers/find-user");
const insertUser = require("../controllers/insert-user");
const rabbitmq = require("../startup/rabbitmq");

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
    const newUser = await insertUser(email, hashedPassword) 

    /* If there is no success */
    if (!newUser.success) return res.status(500).end()

    /* Send to user service */
    rabbitmq.sendToQueue("new-user", {
        userID: newUser.data,
        firstname: firstname, 
        lastname: lastname
    })
    /* Send welcome email */

    /* Send successfull registration */

    res.status(201).json({
        success: true,
        msg: "new-user"
    })
}

module.exports = register