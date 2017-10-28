var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    namadepan: {
    	type: String,
    	default: ''
    },
    namabelakang: {
    	type: String,
    	default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function(){
	return (this.namadepan + ' ' + this.namabelakang);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);