var fs      = require("fs")
var config  = JSON.parse(fs.readFileSync("config.json"));
var mysql   = require("mysql").createClient({
	host: config.database["host"],
	user: config.database["user"],
	password: config.database["password"],
	database: config.database["db-name"]
	});

//Selects a user based on the arguments passed in json format
exports.selectUser = function(args){
	var where = 'WHERE ';
	var length = Object.keys(args).length;
	var i = 1;
	for(var key in args){
		console.log(i + " " + length);

		if(typeof args[key] === 'string'){
			where = where + key + ' = \"' + args[key] + '\" ';
		}
		else{
			where = where + key + ' = ' + args[key] + ' ';
		}
		
		if(i !== length){
			where = where + "AND "
		}
		++i;
	}

	console.log(where);

	mysql.query('SELECT * FROM users ' + where, function(err, rows){
		if(err){
			console.log("error selecting user " + err);
		}
		else{
			console.log(rows);
		}
	});

}
