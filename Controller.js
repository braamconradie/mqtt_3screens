var supercool;
var koord;
var client;

// Create a client instance
  client = new Paho.MQTT.Client("m14.cloudmqtt.com", 33337,"web_" + parseInt(Math.random() * 100));

 function setup() {
 	//this file simply acts as the controller, sending out signals to mqtt, nothing shows in screen. Can follow in console

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  // client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "xxxx",  //replace with own credentials
    password: "xxxxx",
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
    goforit();
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


// this functions sends out numbers to mqtt that is interpreted by the javascript in three separate clients
function goforit(){

  for (var j=0;j<50;j++){
    console.log(j+"  iterations done");
      for (var i=0;i<36;i++){
        var koord = (i*50).toString();  
        message = new Paho.MQTT.Message(koord);
        message.destinationName = "braamdraw";
        //console.log(koord);
        client.send(message);
      }
      for (var i=36;i>1;i--){
        var koord = (i*50).toString();  
        message = new Paho.MQTT.Message(koord);
        message.destinationName = "braamdraw";
        //console.log(koord);
        client.send(message);
      }
  }  
}  

