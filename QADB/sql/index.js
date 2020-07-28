const mysql = require('mysql');
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const config = require('../../config');

const connection = mysql.createPool(config);

const db  = Promise.promisifyAll(connection);

db.getConnectionAsync()
.then(() => console.log('connected'))
.catch((err)=> console.log(err))

module.exports = db;
