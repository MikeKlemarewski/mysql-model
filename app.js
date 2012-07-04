var app     = require("express").createServer();
var express = require("express");
var fs      = require("fs");
var User    = require('./models/user.js');
var Course    = require('./models/course.js');
var config  = JSON.parse(fs.readFileSync("config.json"));

var userArgs = {
	firstName:"jihoon",
	lastName:"klemarewski"
}

var courseArgs = {
	subject:"CMPT"
}

var printResults = function(results){
	for(index in results){
		console.log("FOUND HIM! " + JSON.stringify(results[index]) + "\n\n\n");
	}
}

var showCourses = function(user){
	user.getCourses().success(function(associatedCourses){
		console.log(associatedCourses);
	})
}

User.User.hasMany(Course.Course);
User.selectUser(userArgs, showCourses);
//Course.selectCourses(courseArgs, printResults);
