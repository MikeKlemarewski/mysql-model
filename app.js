var app     = require("express").createServer();
var express = require("express");
var fs      = require("fs");
var User    = require('./models/user.js');
var config  = JSON.parse(fs.readFileSync("config.json"));

var args = {
	lastName:"klemarewski"
}


var printUser = function(user){
	for(index in user){
		console.log("FOUND HIM! " + JSON.stringify(user[index]) + "\n\n\n");
	}
}

User.selectUsers(args, printUser);

