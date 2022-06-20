require("dotenv").config()
const chai = require("chai")
const expect = chai.expect;

//Libaries for testing
const { query } = require('../../lib/startup/mysql')
const findUser = require('../../lib/sql/find-user');

const insertFakeUser = async () => {
    const sql = 'INSERT INTO users SET email_address = ?, password = ?, first_name = ?, last_name = ?'
    const params = ['finduser@gmail.com', 'testingpass', 'Some', 'User']
    const result = await query(sql, params) 
    return result
}

const DeleteFakeUser = async () => {
    const sql = 'DELETE FROM users WHERE email_address = ?'
    const params = ['finduser@gmail.com']
    const result = await query(sql, params)
    return result
}

describe('Doing SQL queries for find user operation', () => {
    before(async () => {
        await insertFakeUser()
    })

    it('Email is not provided, should return object with propery success: false', async () => {
        const result = await findUser({})
        expect(result).to.be.a('object');
        expect(result).to.have.property('success', false)
    })

    it('User is not found, should return object with property success: false and msg: "user-not-found"', async () => {
        const result = await findUser({email: 'notexist@gmail.com'})
        expect(result).to.be.a('object');
        expect(result).to.have.property('success', false)
        expect(result).to.have.property('msg', 'user-not-found')
    })

    it('User is found, should return object with property success: true and msg: "user-found""', async () => {
        const result = await findUser({email: 'finduser@gmail.com'})
        expect(result).to.be.a('object');
        expect(result).to.have.property('success', true)
        expect(result).to.have.property('msg', 'user-found')
    })

    after(async () => {
        await DeleteFakeUser()
    })
})