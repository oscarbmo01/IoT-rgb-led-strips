import mqtt from 'mqtt';
import * as config from '../config.mjs';
import * as ctrlMqtt from '../controllers/mqtt.mjs';
var client = undefined;

function connect() {
  const topic = 'server-node-js';
  client  = mqtt.connect(`${config.BROKER.HOST}:${config.BROKER.PORT}`);
  client.on('connect', () => {
    console.log(`Connect Broker MQTT ${config.BROKER.HOST}:${config.BROKER.PORT}`);
    client.subscribe(topic, (err, granted) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Topic subscribe:', topic);
          onMessageBuffer();
        }
     });
  });
}

function onMessageBuffer() {
  client.on('message', (topic, message) => {
    const body = JSON.parse(message);
    console.log(topic, body);
    ctrlMqtt.publish(client, body);
  });
  client.publish('server-node-js', '{ "msg": "test message" }');
}

function end() {
  client.end();
}

export { connect, client };