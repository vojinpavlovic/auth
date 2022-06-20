// Testing libaries
const chai = require('chai');
const expect = chai.expect;

// Libaries for testing
const loginValidation = require('../../lib/utils/login-validation')

describe('Running test on login input validation', () => {
    it('No inputs are provided, should return false', () => {
        const result = loginValidation({})
        expect(result).to.equal(false)
    })

    it('At least one input is not provided, should return false', () => {
        const result = loginValidation({
            email: "heyhohohey@gmail.com"
        })
        expect(result).to.equal(false)
    })

    it('Invalid email is provided, should return false', () => {
        const result = loginValidation({
            email: "heyhohohey@"
        })
        expect(result).to.equal(false)
    })

    it('Everything is provided, should return true', () => {
        const result = loginValidation({
            email: "heyhohohey@gmail.com",
            password: "Testing2@"
        })
        expect(result).to.equal(true)
    })
})
