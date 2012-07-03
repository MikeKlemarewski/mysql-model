var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.database["host"],
	user: config.database["user"],
	password: config.database["password"],
	});

var createDB = function(){
	mysql.query('CREATE DATABASE IF NOT EXISTS ' + config.database["db-name"], function(err){
		if(err){
			console.log("Unable to create db " + err);
			return;
		}
		else{
			console.log("Database created!");
			mysql.end();
		}
	});
}

createDB();
