const chai = require("chai")
const expect = chai.expect;
const hashPassword = require('../../lib/helpers/hash-password');
const comparePassword = require('../../lib/helpers/compare-password');

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
