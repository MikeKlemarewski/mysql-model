var Backbone = require('backbone');
var fs = require('fs');
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.database["host"],
	user: config.database["user"],
	password: config.database["password"]
	});

exports.User = Backbone.Model.extend({
	initialize: function(){
		if(!this.has("type")){
			console.log("you need a type");
		}
	},

	displayInfo: function(){
		console.log(
			this.get('first_name') + "\n" +
			this.get('last_name') + "\n" +
			this.get('type') + "\n" +
			this.get('user_id') + "\n" +
			this.get('presenter_config') + "\n" +
			this.get('engage_config') + "\n" +
			this.get('accent_config')
		);
	},

	save: function(){
		console.log(this.get('first_name'));
		var that = this;
		mysql.query('USE ' + config.database["db-name"], function(){
			mysql.query('INSERT INTO users'+ 
				'(type, first_name, last_name, user_id, presenter_config, engage_config, accent_config)'+
				'VALUES(' + that.get('type') + ',' +
					'\'' + that.get('first_name') + '\',' +
					'\'' + that.get('last_name') + '\',' +
					'\'' + that.get('user_id') + '\',' +
					that.get('presenter_config') + ',' +
					that.get('engage_config') + ',' +
					that.get('accent_config') +
					')'
					, function(err){
						if(err){
							console.log("Couldn't save user " + err);
							return;
						}
					});
		});
	}
});