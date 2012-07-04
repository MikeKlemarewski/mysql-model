var User = require('../models/user.js').User;
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

var mike = User.build({
	uuid:'A7S7F8GA7SD98A7SDF8ASD7G',
	firstName:'Mike',
	lastName:'Klemarewski',
	type:1,
	userID:'mak10',
	email:'mak10@sfu.ca',
	accentConfig: 1,
	engageConfig: 1,
	rqraConfig: 1
})

mike.save().success(function(user){
	console.log("Saved user " + user.firstName);
});


var jihoon = User.build({
	uuid:'A7BA8DGA7SD98A7SDF8ASD7G',
	firstName:'Jihoon',
	lastName:'Klemarewski',
	type:1,
	userID:'jh99',
	email:'jh99@sfu.ca',
	accentConfig: 2,
	engageConfig: 2,
	rqraConfig: 2
})

jihoon.save().success(function(user){
	console.log("Saved user " + user.firstName);
});

var yukai = User.build({
	uuid:'A7SASGH8AS9B798A7SDF8ASD7G',
	firstName:'Yukai',
	lastName:'Hong',
	type:1,
	userID:'ykh83',
	email:'ykh83@sfu.ca',
	accentConfig: 3,
	engageConfig: 3,
	rqraConfig: 4
})

yukai.save().success(function(user){
	console.log("Saved user " + user.firstName);
});

