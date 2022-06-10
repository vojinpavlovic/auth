const AuthRequired = (req, res) => {
    if (req.session.userData) {
        return res.status(403).end()
    }

    return res.status(200).end()
}

module.exports = AuthRequired