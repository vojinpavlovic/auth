require("dotenv").config()
const chai = require("chai")
const expect = chai.expect;

//Libaries for testing
const { query } = require('../../lib/startup/mysql')
const updateUser = require('../../lib/sql/update-user');

const insertFakeUser = async () => {
    const sql = 'INSERT INTO users SET email_address = ?, password = ?, first_name = ?, last_name = ?'
    const params = ['updateuser@gmail.com', 'testingpass', 'Some', 'User']
    const result = await query(sql, params) 
    return result
}

const DeleteFakeUser = async (email) => {
    const sql = 'DELETE FROM users WHERE email_address = ?'
    const params = [email]
    const result = await query(sql, params)
    return result
}

describe('Doing SQL queries for update user operation', () => {
    before(async () => {
        await DeleteFakeUser('updateuser@gmail.com')
        await DeleteFakeUser('justupdated@gmail.com')
        await insertFakeUser()
    })

    it('Data is not provided, should return false', async () => {
        const result = await updateUser()
        expect(result).to.equal(false)
    })

    it('Columns are not provided, should return false', async () => {
        const result = await updateUser({id: 1})
        expect(result).to.equal(false)
    })

    it('Successfully updating user then checking', async () => {
        const result = await updateUser({
            email: "updateuser@gmail.com",
            columns: {
                email_address: "justupdated@gmail.com"
            }
        })

        expect(result).to.be.a('object');
        expect(result).to.have.property('success', true)
        expect(result).to.have.property('msg', "user-updated")

        const result2 = await updateUser({
            email: "justupdated@gmail.com",
            columns: {
                email_address: "justupdated@gmail.com"
            }
        })

        expect(result2).to.be.a('object');
        expect(result2).to.have.property('success', false)
        expect(result2).to.have.property('msg', "nothing-has-changed")
    })

    after(async () => {
        DeleteFakeUser('updateuser@gmail.com')
        DeleteFakeUser('justupdated@gmail.com')
    })
})
