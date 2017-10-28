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
    // create a new dish
    tabel1.create({
        name: 'Uthapizza',
        description: 'Test'
    }, function (err, dish) {
        if (err) throw err;
        console.log('berhasil dibuat!');
        console.log(dish);

        var id = dish._id;

        // get all the tabel1
        setTimeout(function () {
            tabel1.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated data terbaru!');
                    console.log(dish);

                    // db.collection('tabel1').drop(function () {
                    //     db.close();
                    // });
                });
        }, 3000);
    });
});