var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.database["host"],
	user: config.database["user"],
	password: config.database["password"],
	database: config.database["db-name"]
	});

var createDB = function(){
	mysql.query('CREATE DATABASE IF NOT EXISTS ' + config.database["db-name"], function(err){
		if(err){
			console.log("Unable to create db " + err);
			return;
		}
		else{
			createTables();
		}
	});
}

var showTables = function(){
	mysql.query('USE ' + config.database["db-name"], function(err){
		if(err){
			console.log("Can't use dababase " + config.database["db-name"]);
			return;
		}
		else{
			mysql.query('SHOW TABLES', function(err, rows){
				if(err){
					console.log("Can't show tables " + err);
					return;
				}
				else{
					console.log(rows);
				}
			});
		}
	})
}

var createTables = function(){
	mysql.query('USE ' + config.database["db-name"], function(err){
		if(err){
			console.log("Can't use dababase " + config.database["db-name"]);
			return;
		}
		else{
			createUsersTable();
			showTables();
		}
	});
}

var createUsersTable = function(){
	mysql.query("CREATE TABLE IF NOT EXISTS users (" + 
		"id INT NOT NULL AUTO_INCREMENT, " + 
		"type INT NOT NULL DEFAULT 0, " + 
		"first_name VARCHAR(40)," +
		"last_name VARCHAR(40)," +
		"user_id VARCHAR(20)," +
		"presenter_config INT," +
		"accent_config INT," +
		"engage_config INT," +
		"PRIMARY KEY (id)" +
		")",
		function(err){

		}
	);
}

//Selects a user based on the arguments passed in json format
exports.selectUser = function(args){
	var where = 'WHERE ';
	var length = Object.keys(args).length;
	var i = 1;
	for(var key in args){
		console.log(i + " " + length);

		if(typeof args[key] === 'string'){
			where = where + key + ' = \"' + args[key] + '\" ';
		}
		else{
			where = where + key + ' = ' + args[key] + ' ';
		}
		
		if(i !== length){
			where = where + "AND "
		}
		++i;
	}

	console.log(where);

	mysql.query('SELECT * FROM users ' + where, function(err, rows){
		if(err){
			console.log("error selecting user " + err);
		}
		else{
			console.log(rows);
		}
	});

}

createDB();