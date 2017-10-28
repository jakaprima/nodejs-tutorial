var mongoose = require('mongoose'),
    assert = require('assert');

var tabel1 = require('./models/model-1');

// Connection URL
var url = 'mongodb://localhost:27017/namadatabase3';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    var databaru = tabel1({
        name: 'jaka',
        description: 'testing1'
    });

    // save the user
    databaru.save(function (err) {
        if (err) throw err;
        console.log('data terbuat!');

        // get all the users
        tabel1.find({}, function (err, tabel1) {
            if (err) throw err;

            // object of all the users
            console.log(tabel1);
            //             db.collection('tabel1').drop(function () {
            //     db.close();
            // });
        });
    });
});