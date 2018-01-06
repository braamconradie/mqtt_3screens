var supercool;
var koord;
var client;

 function setup() {
 	//can make fancier later. this file just demonstrates the basic concept
   createCanvas(600, 300);
	 background(100);
   ellipse(300, 150, 20,20);
   strokeWeight(10)
	 stroke(0);
   
   // Create a client instance
  client = new Paho.MQTT.Client("m14.cloudmqtt.com", 33337,"web_" + parseInt(Math.random() * 100));
  //Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "yyqzwwpb",
    password: "UHDKx2H5Jmp_",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
      
}

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("braamdraw");
    
    message = new Paho.MQTT.Message("Hello CloudMQTT man this is wicked");
    //message.destinationName = "braamdraw";
    //client.send(message);
  }

  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    
    supercool=message.payloadString
    background(100);
    if (supercool <600){
      ellipse(parseInt(supercool), 150, 50,50);
      console.log(parseInt(supercool));
    } else {
      background(100);
    }
    if (parseInt(supercool)==0){
      var outmessage = new Paho.MQTT.Message("1");
      outmessage.destinationName = "aanskakel";
      client.send(outmessage);
    
    }
  }
  
