var mqtt     = require('mqtt');
var config   = require('./config');

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);

client.on('connect', function () {

    setInterval(
        function(){

            client.publish(config.mqtt.topics, '{"datetime":"'+ new Date().toLocaleString() +'", "sensor":"tmp", "value":"'+ Math.floor(Math.random() * (41 - 20 + 1) + 20) +'"}');
            client.publish(config.mqtt.topics, '{"datetime":"'+ new Date().toLocaleString() +'", "sensor":"hum", "value":"'+ Math.floor(Math.random() * (80 - 50 + 1) + 50) +'"}');
            client.publish(config.mqtt.topics, '{"datetime":"'+ new Date().toLocaleString() +'", "sensor":"aper", "value":"'+ Math.floor(Math.random() * 2) +'"}');
            client.publish(config.mqtt.topics, '{"datetime":"'+ new Date().toLocaleString() +'", "sensor":"gas", "value":"'+ Math.floor(Math.random() * 2) +'"}');

        }, 5000)
  });

client.on("error", function(error) {
    console.log("ERROR: ", error);
});
