var app     = require("express").createServer();
var express = require("express");
var fs      = require("fs");
var User    = require('./models/user.js');
var Course    = require('./models/course.js');
var config  = JSON.parse(fs.readFileSync("config.json"));

var userArgs = {
	firstName:"yukai"
}

var courseArgs = {
	subject:"CMPT",
	number: 371
}

var printResults = function(results){
	console.log("FOUND HIM! " + JSON.stringify(results) + "\n\n\n");
}

var showCourses = function(courses){
	for(index in courses){
		console.log("Course: " + JSON.stringify(courses[index]) + "\n");
	}
}

//User.getUserCourses(userArgs, showCourses);
Course.getInstructor(courseArgs, printResults);
