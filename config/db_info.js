var mysql = require('mysql');

var connect_inf = {
    host : 'localhost',
    port : '3306',
    user: "root",
    password: "rnjsgusqls0304",
    database: "whois",
}


var connection = {
    init : () => {
        return mysql.createConnection(connect_inf);
    },

    dbopen : (con) => {
        con.connect((err) => {
            if(err){
                console.log("connection err");
            }
            else{
                console.log("connection success");
            }
        })
    },
    query : (con, query, callback) => {
        con.query(query, callback);
    },
    end : (con) => {
        con.end();
    }

}

module.exports = connection;
