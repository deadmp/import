const fs = require("fs");
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'wiki_dev'
});

connection.connect();

fs.readFile("./games.json", (err, data) => {
    data = JSON.parse(data).applist.apps;
    for(let i = 0; i < data.length; i++) {
        connection.query('INSERT INTO `steam_games` (`appid`, `name`) VALUES (?, ?);', [data[i].appid, data[i].name], (error) => { 
            if (error) { 
                console.log("i: %d\nappid: %d\ngame: %s", i, data[i].appid, data[i].name);
                throw error;} 
        });
    }
});
