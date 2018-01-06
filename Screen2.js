var supercool;
var koord;

 function setup() {
 	//can make fancier later 
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
    if (supercool>600&&supercool<1200){
      ellipse(parseInt(supercool-600), 150, 50,50);
    } else {
      background(100);
    }
    
    
    
    
    
    // background(100);
    // if (supercool >600){
    //   ellipse(parseInt(supercool), 150, 50,50);
    // } 
    // else {
    // background (100);
    // }
  }
  
  
