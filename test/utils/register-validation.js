// Testing libaries
const chai = require('chai');
const expect = chai.expect;

// Libaries for testing
const registerValidation = require('../../lib/utils/register-validation')

describe('Running test on register input validation', () => {
    it('No inputs are provided, should return false', () => {
        const result = registerValidation({})
        expect(result).to.equal(false)
    })

    it('First name is not provided, should return false', () => {
        const result = registerValidation({
            lastname: "Testing",
            email: "heyhohohey@gmail.com",
            password: "Testing2@",
            confirmPassword: "Testing2@"
        })

        expect(result).to.equal(false)
    })

    it('First name is not alpha, should return false', () => {
        const result = registerValidation({
            firstname: "2",
            lastname: "Testing",
            email: "heyhohohey@gmail.com",
            password: "Testing2@",
            confirmPassword: "Testing2@"
        })

        expect(result).to.equal(false)
    })

    it('Last name is not alpha, should return false', () => {
        const result = registerValidation({
            firstname: "Some name",
            lastname: "2",
            email: "heyhohohey@gmail.com",
            password: "Testing2@",
            confirmPassword: "Testing2@"
        })

        expect(result).to.equal(false)
    })

    it('First name is short, 2 characters only, should return false', () => {
        const result = registerValidation({
            firstname: "Sh",
            lastname: "Okay",
            email: "heyhohohey@gmail.com",
            password: "Testing2@",
            confirmPassword: "Testing2@"
        })

        expect(result).to.equal(false)
    })

    it('Last name is short, 2 characters only, should return false', () => {
        const result = registerValidation({
            firstname: "Okay",
            lastname: "Sh",
            email: "heyhohohey@gmail.com",
            password: "Testing2@",
            confirmPassword: "Testing2@"
        })

        expect(result).to.equal(false)
    })

    it('Email is invalid, should return false', () => {
        const result = registerValidation({
            firstname: "Testing",
            lastname: "Testing",
            email: "testing@",
            password: "Testing2@",
            confirmPassword: "Testing2@"
        })

        expect(result).to.equal(false)
    })

    it('Password does not contain special character, should return false', () => {
        const result = registerValidation({
            firstname: "Testing",
            lastname: "Testing",
            email: "testing@gmail.com",
            password: "Testing2",
            confirmPassword: "Testing2"
        })

        expect(result).to.equal(false)
    })

    it('Password is not confirmed, should return false', () => {
        const result = registerValidation({
            firstname: "Testing",
            lastname: "Testing",
            email: "heyhohohey@gmail.com",
            password: "Testing2@",
            confirmPassword: "Testing2"
        })

        expect(result).to.equal(false)
    })

    it('Everything is fine, should return true', () => {
        const result = registerValidation({
            firstname: "Testing",
            lastname: "Testing",
            email: "heyhohohey@gmail.com",
            password: "Testing2@",
            confirmPassword: "Testing2@"
        })

        expect(result).to.equal(true)
    })
})