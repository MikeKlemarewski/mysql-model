var User = require('../models/user.js').User;
var Course = require('../models/course.js').Course;
var fs = require('fs');
var config  = JSON.parse(fs.readFileSync("config.json"));
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

User.sync();
Course.sync();
