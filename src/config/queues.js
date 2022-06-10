const Config = [
    {
        name: "new-user",
        options: {
            durable: true,
        },
        desc: "For creating new user, so user service can consume it"
    }
]

module.exports = Config