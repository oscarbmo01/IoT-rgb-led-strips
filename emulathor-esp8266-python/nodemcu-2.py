# Emulathor NodeMCU

import paho.mqtt.client as mqtt
import json

chip_id = 2
data = json.dumps({
    'target': 'register',
    'chipId': chip_id,
    'topic': f'rgb-led-strip-{chip_id}',
    'room': 'cocina',
    'installationDescription': 'en la estufa',
    'defaultColor': '#FFFFFF'
})

def on_connect(client, userdata, flags, rc):
    print("Conexion al broker exitosa " + str(rc))
    client.subscribe(f'rgb-led-strip-{chip_id}')
    publish()

def on_message(client, userdata, msg):
    datos = json.loads(msg.payload)
    print(datos)

def publish():
    topic = 'server-node-js'
    client.publish(topic, payload=data, qos=0, retain=False)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect('localhost', 1883, 60)
client.loop_forever()


print('mal-igna')
