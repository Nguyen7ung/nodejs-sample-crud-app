'user strict';

var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'db',
    user     : 'root',
    password : 'mysql',
    database : 'example'
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
