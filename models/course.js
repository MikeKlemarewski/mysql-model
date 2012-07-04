var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var Sequelize = require('sequelize');
var db = new Sequelize(
	config.database["db-name"],	
	config.database["user"],
	config.database["password"],
	{
		host: config.database["host"],
	}
);

var Course = exports.Course = db.define('Course', {
	uuid: {type: Sequelize.STRING, primaryKey: true},
	title: Sequelize.STRING,
	section: Sequelize.STRING,
	subject: Sequelize.STRING,
	number: Sequelize.INTEGER
});

exports.selectCourse = function(args, callback){
	Course.find({where: args}).success(function(course){
		callback(course);
	}).error(function(error){
		console.log("Couldn't select course " + error);
	});
}

exports.selectCourses = function(args, callback){
	Course.find({where: args}).success(function(course){
		callback(course);
	}).error(function(error){
		console.log("Couldn't select course " + error);
	});
}