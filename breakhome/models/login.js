var mongoose = require('mongoose');
var Schema = mongoose.Schema;
passportLocalMongoose = require('passport-local-mongoose');

var LoginSchema = new Schema({
	username: String,
	password: String
});

LoginSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Login', LoginSchema);