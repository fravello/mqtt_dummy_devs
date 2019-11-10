var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.topics = process.env.MQTT_TOPICS || 'redit/sensor';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '209.97.151.212';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;

module.exports = config;
