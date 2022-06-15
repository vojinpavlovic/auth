const crypto = require("crypto")

const generateString = length => {
    if (!length) {
        return console.error("random-string.js >> length not defined!")
    }
    
    if (typeof length !== "number") {
        return console.error("random-string.js >> length must be a number!")
    } 
        
    return crypto.randomBytes(length).toString("hex")
}

module.exports = generateString