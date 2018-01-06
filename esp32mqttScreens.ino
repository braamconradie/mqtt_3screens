
#include <WiFi.h>
#include <PubSubClient.h>

//wifi ssid in next line
const char* ssid = "xxxxx";
// wifi password in next line
const char* password = "xxxxxx";  
const char* mqttServer = "m14.cloudmqtt.com";
const int mqttPort = 13337;
const char* mqttUser = "xxxxxx";
const char* mqttPassword = "xxxxxxx";
const char* inTopic = "aanskakel";

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
char msg[50];
int value = 0;

int relay_pin = 12;

void setup_wifi() {
  delay(1000);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  }

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
  Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '0') {
  digitalWrite(relay_pin, LOW); // Turn the LED on (Note that LOW is the voltage level
  Serial.println("relay_pin -> LOW");
  // relayState = LOW;
  } else if ((char)payload[0] == '1') {
  digitalWrite(relay_pin, HIGH); // Turn the LED off by making the voltage HIGH
  Serial.println("relay_pin -> HIGH");
  // relayState = HIGH;
  } else if ((char)payload[0] == '2') {
  delay(10);
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
  Serial.print("Attempting MQTT connection...");
  // Attempt to connect
  if (client.connect("ESP32Client",mqttUser,mqttPassword)) {
  Serial.println("connected");
  // Once connected, publish an announcement...
  //client.publish(outTopic, "Sonoff1 booted");
  // ... and resubscribe
  client.subscribe(inTopic);
  } else {
  Serial.print("failed, rc=");
  Serial.print(client.state());
  Serial.println(" try again in 5 seconds");
  // Wait 5 seconds before retrying
  }
  }
}

void setup() {
  pinMode(relay_pin, OUTPUT); // Initialize the relay pin as an output
  Serial.begin(115200);
  setup_wifi(); // Connect to wifi
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
  reconnect();
  }
  client.loop();
}
