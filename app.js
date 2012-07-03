var app     = require("express").createServer();
var express = require("express");
var fs      = require("fs");
var dbQueries = require('./database/queries.js');
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.database["host"],
	user: config.database["user"],
	password: config.database["password"]
	});

var User = require('./database/create-tables.js').User;

User.create({
	uuid:'A7S7F8GA7SD98A7SDF8ASD7G',
	firstName:'Mike',
	lastName:'Klemarewski',
	type:1,
	userID:'mak10',
	email:'mak10@sfu.ca',
	accentConfig: 1,
	engageConfig: 1,
	rqraConfig: 1
	}).success(function(user){
		user.save().success(function(){
			console.log("Saved user");
		});
	});

var args = {
	first_name:"mike",
	last_name:"klemarewski"
}

//dbQueries.selectUser(args);
