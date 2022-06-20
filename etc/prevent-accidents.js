
/* 
    This type of script is to check if there is accidents with enviornment 
    One of the accident would be using same DB_PROD_DATABASE with DB_DEV_DATABASE
*/

require('dotenv').config()

/* Checking if accident check is enabled */

var accidentCheck = process.env.ENABLE_ACCIDENTS_CHECK || false

if (accidentCheck && accidentCheck == "1") {
    accidentCheck = true
} else {
    accidentCheck = false
}

/* If is not enabled then return */
if (!accidentCheck) return

/*
    Checking if databases conflicts with other env 
*/

/* MySQL */

const checkMySQLConflict = () => {
    const databases = [
        process.env.DB_PROD_DATABASE,
        process.env.DB_DEV_DATABASE, 
        process.env.DB_TEST_DATABASE
    ]
    
    return new Set(databases).size !== databases.length
}

if (checkMySQLConflict()) {
    console.error('Two or more MySQL databases cannot share same name!')
    process.exit(1)
}

/* Redis */

const checkRedisConflict = () => {
    const databases = [
        process.env.REDIS_PROD_DB,
        process.env.REDIS_DEV_DB,
        process.env.REDIS_TEST_DB
    ]

    return new Set(databases).size !== databases.length
}

if (checkRedisConflict()) {
    console.error('Two or more Redis databases cannot share same name!')
    process.exit(1)
}
