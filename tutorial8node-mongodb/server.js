var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/namadatabase2';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, 
        { name: "jaka2", description: "Test2" }, //yang mau diinsert
        "tabel2", //nama tabel
        function (result) {
            console.log(result.ops);

            dboper.findDocuments(db, 
                "tabel2",
                function (docs) {
                console.log(docs);

                dboper.updateDocument(db, 
                    { name: "jaka2" }, // key untuk search mana yang mau di update
                    { description: "Updated Test" }, //isi yang mau di update
                    "tabel2", //tabel
                    function (result) {
                        console.log(result.result);

                        dboper.findDocuments(db, 
                            "tabel2", 
                            function (docs) {
                            console.log(docs)

                            // db.dropCollection("tabel2", function (result) {
                            //     console.log(result);

                            //     db.close();
                            // });
                        });
                    });
            });
        });
});