var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.mysqlDatabase["host"],
	user: config.mysqlDatabase["user"],
	password: config.mysqlDatabase["password"],
	});

var User = require('../models/user.js').User;
var Course = require('../models/course.js').Course;
var Sequelize = require('sequelize');
var db = new Sequelize(
	config.mysqlDatabase["db-name"],	
	config.mysqlDatabase["user"],
	config.mysqlDatabase["password"],
	{
		host: config.mysqlDatabase["host"],
		define: {charset:'utf8'}
	}
);


var createDB = function(){
	mysql.query('CREATE DATABASE IF NOT EXISTS ' + config.mysqlDatabase["db-name"] + ' CHARACTER SET \'utf8\''
		, function(err){
		if(err){
			console.log("Unable to create db " + err);
			return;
		}
		else{
			console.log("Database created! Creating tables...\n");
			mysql.end();
			User.sync();
			Course.sync();
		}
	});
}


createDB();