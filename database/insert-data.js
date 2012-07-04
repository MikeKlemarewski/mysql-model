var User = require('../models/user.js').User;
var Course = require('../models/course.js').Course;
var fs = require('fs');
var config  = JSON.parse(fs.readFileSync("config.json"));
var data  = JSON.parse(fs.readFileSync("./mysqlDatabase/test-data.json"));
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

for(index in data.courses){
	var course = Course.create(data.courses[index]).success(function(course){
		course.save().error(function(error){
			console.log("Failed to insert course " + error);
		})
	})
}
for(index in data.users){
	var user = User.build(data.users[index]);

	user.save().error(function(error){
		console.log("Failed to insert user " + error);
	});

}