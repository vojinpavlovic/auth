module.exports = store => {
    return {
        store: store,
        secret: "tajna",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 1000 * 60 * 10    
        }
    }
}