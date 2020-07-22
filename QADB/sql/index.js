const mysql = require('mysql');
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const config = require('../../config');

const connection = mysql.createConnection(config);

const db  = Promise.promisifyAll(connection);

db.connectAsync()
.then(() => console.log('connected'))
.catch(()=> console.log('failed'))

module.exports = db;