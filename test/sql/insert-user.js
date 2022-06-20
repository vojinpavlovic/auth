require("dotenv").config()
const chai = require("chai")
const expect = chai.expect;

// Change enviornment to testing

//Libaries for testing
const { query } = require('../../lib/startup/mysql')
const insertUser = require('../../lib/sql/insert-user');

const fakeEmail = "insertuser@testing.com", fakePass = "Testing@2", fakeFirstname = "Testing", fakeLastName = "Testing" 

const DeleteFakeUser = async () => {
    const sql = 'DELETE FROM users WHERE email_address = ?'
    const params = [fakeEmail]
    const result = await query(sql, params)
    return result
}

describe('Doing SQL queries for insert user operation', () => {
    it('Parametres are not provided, should return object with success: false and msg: "bad-request"', async () => {
        const result = await insertUser({})
        expect(result).to.be.a('object');
        expect(result).to.have.property('success', false)
        expect(result).to.have.property('msg', "bad-request")
    })

    it('At least one parameter is not found, should return object with success: false and msg: "bad-request"', async () => {
        const result = await insertUser(fakeEmail, fakePass, fakeFirstname)

        expect(result).to.be.a('object');
        expect(result).to.have.property('success', false)
        expect(result).to.have.property('msg', "bad-request")
    })

    it('User is inserted, should return object with success: true, msg: user-inserted and data with result.insertid"', async () => {
        const result = await insertUser(fakeEmail, fakePass, fakeFirstname, fakeLastName)

        expect(result).to.be.a('object');
        expect(result).to.have.property('success', true)
        expect(result).to.have.property('msg', "user-inserted")
        expect(result).to.have.property('data')
        expect(result.data).to.be.a("number")
    })

    after(async () => await DeleteFakeUser())
})