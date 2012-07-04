var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.database["host"],
	user: config.database["user"],
	password: config.database["password"],
	});

var User = require('../models/user.js').User;
var Course = require('../models/course.js').Course;
var Sequelize = require('sequelize');
var db = new Sequelize(
	config.database["db-name"],	
	config.database["user"],
	config.database["password"],
	{
		host: config.database["host"],
		define: {charset:'utf8'}
	}
);


var createDB = function(){
	mysql.query('CREATE DATABASE IF NOT EXISTS ' + config.database["db-name"] + ' CHARACTER SET \'utf8\''
		, function(err){
		if(err){
			console.log("Unable to create db " + err);
			return;
		}
		else{
			console.log("Database created! Creating tables...");
			mysql.end();
			User.sync();
			Course.sync();
		}
	});
}

createDB();
