const chai = require("chai")
const expect = chai.expect;

const hashPassword = require('../../lib/helpers/hash-password');

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