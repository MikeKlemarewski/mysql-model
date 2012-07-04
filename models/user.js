var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var Sequelize = require('sequelize');
var Course = require('./course.js').Course;
var db = new Sequelize(
	config.database["db-name"],	
	config.database["user"],
	config.database["password"],
	{
		host: config.database["host"],
	}
);

var User = exports.User = db.define('User', {
	uuid: {type: Sequelize.STRING, primaryKey: true},
	type: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
	firstName: {type: Sequelize.STRING, allowNull: false},
	lastName: {type: Sequelize.STRING, allowNull: false},
	userID: {type: Sequelize.STRING, unique: true},
	email: {type: Sequelize.STRING, unique: true, validate:{isEmail: true}},
	engageConfig: {type: Sequelize.INTEGER, unique: true},
	accentConfig: {type: Sequelize.INTEGER, unique: true},
	rqraConfig: {type: Sequelize.INTEGER, unique: true},
	courses: {type: Sequelize.TEXT}
});

exports.selectUser = function(args, callback){
	User.find({where: args}).success(function(user){
		callback(user);
	}).error(function(error){
		console.log("Couldn't find user " + error);
	});
}

exports.selectUsers = function(args, callback){
	User.findAll({where: args}).success(function(users){
		callback(users);
	}).error(function(error){
		console.log("Failed to select users " + error);
	});
}