const findUser = require("../sql/find-user");
const validate = require("../utils/login-validation");
const comparePassword = require('../helpers/compare-password');

const login = async (req, res) => {
    /* Check if inputs are valid */
    if (!validate(req.body)) {
        return res.status(400).end()
    }

    /* Find user */
    const { email, password } = req.body

    const user = await findUser({ email: email})
    
    /* If user is not found */
    if (!user.success) {
        return res.status(403).end()
    };
    
    /* Compare password */
    const passwordMatch = await comparePassword(password, user.result.password)
    
    /* If error happened */
    if (typeof passwordMatch == "null") return res.status(500).end()
    
    /* If password not match */
    if (!passwordMatch) return res.status(403).end()

    /* Send success response and make session */
    const payload = {
        id: user.result.id,
        email: user.result.email_address,
        status: user.result.status
    }

    req.session.userData = payload

    res.status(200).json({
        success: true,
        msg: "user-authenticated"
    })
}

module.exports = login