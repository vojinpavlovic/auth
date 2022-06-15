require('dotenv').config()
const mysql = require('mysql')
const connEmitter = require("../events/conn")
const connParams = require("../config/mysql")
/* Creating connection pool */

const pool = mysql.createPool(connParams);

/* Checking database for errors */
pool.getConnection((err, connection) => {
    if (err) {
        console.log(err)
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                return console.error('Database Connection has been closed')
            case 'ER_CON_COUNT_ERROR': 
                return console.error('Database has too many connections')
            case 'ECONNREFUSED': 
                return console.error('Database Connection has been refused')
            case 'ENOTFOUND':
                return console.error('Database connection not found')
            case 'ER_NO_DB_ERROR':
                return console.error('No database is found')
            default:
                break;
        }
    }

    connEmitter.emit("mysql-ready")
    if (connection) return connection.release()
})

/* Promising a get connection */
const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release()
                return reject(err);
            }
            
            resolve(connection);
        });
    });
};

/* Making a query process */
const Query = async (sql, params) => {
    /* Getting connection */
    const conn = await getConnection();

    /*  Making a promise for conn query */
    const promise = new Promise((resolve, reject) => {
        conn.query(sql, params, (err, res) => {
            if (err) {
                conn.release()
                console.log(err)
                return reject(err)
            }

            conn.release()
            resolve(res)
        })
    })

    /* Return result if is fullfiled, and return null if rejected */
    return promise.then(res => res).catch(err => null)
}

module.exports = Query