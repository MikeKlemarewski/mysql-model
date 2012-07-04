var should = require('should');
var queries = require('../../database/db-queries.js');

module.exports = {

	createDeleteTests:{
		'db creation': function(test){
			createDB();
			test.ok(1);
			test.done();
		}
	}
}