require("dotenv").config()
/* Importing instance of app */
const server = require("../index.js")
const query = require('../src/startup/mysql')

/* Requiring supertest */
const request = require('supertest');

if (process.env.NODE_ENV != "test") {
    console.error("Cannot run test, application is not in test enviornment")
    console.error("Go to .env file and change NODE_ENV to test")
    process.exit(1)
}

/* Let's define register tests */

const registerTasks = [
    // First test: If inputs are missing, it should return 400
    {
        it: "All inputs are missing, it should return status 400",
        data: {},
        expectStatus: 400
    },
    {
        it: "Email input is missing, it should return status 400",
        data: {
            firstname: "Vojin",
            lastname: "Pavlovic",
            password: "SomePass@2"
        },
        expectStatus: 400 
    },
    {
        it: "Email is invalid, it should return status 400",
        data: {
            firstname: "Vojin",
            lastname: "Pavlovic",
            password: "SomePass@2",
            email: "invalidemail@"
        },
        expectStatus: 400 
    },
    {
        it: "Password is invalid, it should return status 400",
        data: {
            firstname: "Vojin",
            lastname: "Pavlovic",
            password: "SomePass",
            confirmPassword: "SomePass@2",
            email: "validemail@gmail.com",
        },
        expectStatus: 400  
    },
    {
        it: "Password is not confirmed, it should return status 400",
        data: {
            firstname: "Vojin",
            lastname: "Pavlovic",
            password: "SomePass",
            confirmPassword: "SomePass2",
            email: "invalidemail@"
        },
        expectStatus: 400  
    },
    {
        it: "It should create new user, return status is 201",
        data: {
            firstname: "Vojin",
            lastname: "Pavlovic",
            password: "SomePass@2",
            confirmPassword: "SomePass@2",
            email: "validemail@gmail.com",
        },
        expectStatus: 201
    },
    {
        it: "User already exist, should return 200",
        data: {
            firstname: "Vojin",
            lastname: "Pavlovic",
            password: "SomePass@2",
            confirmPassword: "SomePass@2",
            email: "validemail@gmail.com",
        },
        expectStatus: 200
    }
]

const loginTasks = [
    {
        it: "All inputs are missing, should return status 400",
        data: {},
        expectStatus: 400
    },
    {
        it: "Email input are missing, should return status 400",
        data: {
            password: "SomePass@2"
        },
        expectStatus: 400
    },    
    {
        it: "Password input are missing, should return status 400",
        data: {
            email: "validemail@gmail.com"
        },
        expectStatus: 400
    },
    {
        it: "Email is not valid, should return status 400",
        data: {
            email: "invalidemail@",
            password: "not-valid-password"
        },
        expectStatus: 400
    },
    {
        it: "Email is correct, password isn't, should return status 403",
        data: {
            email: "validemail@gmail.com",
            password: "not-valid-password"
        },
        expectStatus: 403
    },
    {
        it: "User does not exist, should return status 403",
        data: {
            email: "notexist@gmail.com",
            password: "not-valid-password"
        },
        expectStatus: 403
    },
    {
        it: "Credentials are okay, should return status 200",
        data: {
            email: "validemail@gmail.com",
            password: "SomePass@2"
        },
        expectStatus: 200
    },
]

const DeleteUsers = () => {
    const sql = "TRUNCATE TABLE users"
    query(sql, {})
}


describe('Running Test on /register endpoint', () => {
    describe("POST /register", () => {
        registerTasks.forEach(test => {
            it(test.it, done => {
                request(server)
                .post("/register")
                .send(test.data)
                .set('Accept', 'application/json')
                .expect(test.expectStatus)
                .end(done)  
            })
        });
    })
})

describe('Running Test on /login endpoint', () => {
    describe("POST /login", () => {
        loginTasks.forEach(test => {
            it(test.it, done => {
                request(server)
                .post("/login")
                .send(test.data)
                .set('Accept', 'application/json')
                .expect(test.expectStatus)
                .end(done)  
            })
        });
        after(() => {
            DeleteUsers()
        });
    })
})







