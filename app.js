var app     = require("express").createServer();
var express = require("express");
var fs      = require("fs");
var dbQueries = require('./database.js');
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.database["host"],
	user: config.database["user"],
	password: config.database["password"]
	});

var User = require('./models/user.js');

var mike = new User.User({
	first_name:'Mike',
	last_name:'Klemarewski',
	type:1,
	user_id:'mak10',
	presenter_config: 1,
	accent_config: 1,
	engage_config: 1
	});

mike.displayInfo();
//mike.save();
var args = {
	first_name:"mike",
	last_name:"klemarewski"
}

dbQueries.selectUser(args);