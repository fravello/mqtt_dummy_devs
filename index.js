var mongodb  = require('mongodb');
var mqtt     = require('mqtt');
var config   = require('./config');

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);

client.on('connect', function () {
    client.subscribe(config.mqtt.topics);
});

var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port;

mongodb.MongoClient.connect(mongoUri, { useNewUrlParser: true }, function(error, database) {

    if(error != null) {
        throw error;
    }

    client.on('message', function (topic, message) {
        var messageObject = {
            topic: topic,
            message: message.toString(),
            date: new Date().toLocaleString()
        };

        db = database.db(config.mongodb.database);

        db.collection(config.mongodb.collection).insertOne(messageObject, function(error, result) {
            if(error != null) {
                console.log("ERROR: " + error);
            }
        });
    });
});
