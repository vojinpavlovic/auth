const chai = require("chai")
const hashPassword = require('../src/helpers/hash-password');
const comparePassword = require('../src/helpers/compare-password');
const expect = chai.expect;

if (process.env.NODE_ENV != "test") {
    console.error("Cannot run test, application is not in test enviornment")
    console.error("Go to .env file and change NODE_ENV to test")
    process.exit(1)
}

describe('Running tests on hashing password', () => {
    it('Hashing password >> password is undefined, it should return false', async () => {
        const password = undefined
        const result = await hashPassword(password)
        expect(result).to.equal(false)
    })

    it('Hashing password >> it should return string', async () => {
        const password = "some-password"
        const result = await hashPassword(password)
        expect(result).to.an("string")
    })

    it('Hashing password >> it should return 60 length string', async () => {
        const password = "some-password"
        const result = await hashPassword(password)
        expect(result).to.have.lengthOf(60)
    })
})

describe('Running tests comparing password', () => {
    it('Compare password >> inputs are not provided, it should return false', async () => {
        const password = undefined
        const passwordToCompare = undefined
        const result = await comparePassword(password, passwordToCompare)
        expect(result).to.equal(false)
    })

    it('Compare password >> password is not provided, it should return false', async () => {
        const password = undefined
        const passwordToCompare = "some-pass"
        const result = await comparePassword(password, passwordToCompare)
        expect(result).to.equal(false)
    })

    it('Compare password >> passwords is not same, it should return false', async () => {
        const entered = "some-pass-not-same"
        const hashedPassword = await hashPassword("SomePass")
        const result = await comparePassword(entered, hashedPassword)
        expect(result).to.equal(false)
    })

    it('Compare password >> passwords are same, it should return true', async () => {
        const entered = "SomePass"
        const hashedPassword = await hashPassword("SomePass")
        const result = await comparePassword(entered, hashedPassword)
        expect(result).to.equal(true)
    })
});
