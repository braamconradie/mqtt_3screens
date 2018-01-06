# mqtt_3screens
Experiment with Javascript client files that sends a ball travelling across three separate computers' screens. Also combined mqtt code with ESP32 that swithed on a 240V device, trigged by MQTT messages.

I have been playing with MQTT (Message Queuing Telemetry Transport) for a while. I have finally been making modest success to get it to work. 

Click the link https://www.youtube.com/watch?v=GB6GTJho6RU to see a 30sec video on youtube on what the finished prototype looks like.

Three separate clients have a simple html/javascript file that hooks up to MQTT. Then a fourth client runs a simple js file that acts as the controller, simply running a nested for loop that sends out x co-ordinates from 0 to 1800. Client 1 shows the circle if it is between 0 and 600, the second client if between 600 and 1200 and the third client if between 1200 and 1800. You will see that I also threw in an ipad for fun, running the 2nd client file alongside the pc behind it. The third client was run off a raspberry pi.

Then, to road test the MQTT capability, I hooked up an ESP32 chip (the successor to the ESP8266) to a relay. I cut a powercord in half and wired in the relay on the live phase (PLEASE DO NOT DO THIS IF YOU ARE NOT FAMILIAR WITH WORKING AT HIGH VOLTAGES, IN THIS CASE 240V). 
Once the circle (let’s call it a ball) bounces off the left screen (client1) it switches a light off that is plugged into the power cord.  When it gets to the edge of the right hand screen (client3) it switches off. This is accomplished by sending a special MQTT message when the x coordinate value is 0 or 1800. The ESP32 is separately linked to the same MQTT broker and keeps polling for values. 

There is no server side code required to do this project. 

There are several comments to make here:
•	Node/Socket.io could probably do a better job on the screens, but in order to communicate to an external chip with minimal computation ability you need mqtt, which shines in such situations (low footprint).

•	It is very stable with the example code which runs 20 cycles across the three screens. When you go much more that that it loses the plot. This must be due to shoddy code and nothing to do with MQTT (I stress tested mqtt by running about 600 messages a second between two raspberry pis over several days – this added up to several billions of messages (yes, the one with nine zeroes…) and it was rock solid over the entire period (I used python in that case).

•	I also know that something is not optimal about my code because the controller runs through the 20 iterions in a flash, but then the 3 clients take ages to complete their thing. It is almost as if it goes into a buffer state (this may be a clue as to why it loses the plot when you put too much volume into the mix)

•	I was lazy and did not work neatly with each separate screen size, I simply manually expanded the screens to look OK (lazy).

•	I only included the Screen1 html file above. For Screen 2, Screen 3 and for the Controller.js file you can use exactly the same Screen1.html file (but obviously just change the reference to the relevant javascript file) 

•	Remember to change your credentials. I recommend that you use CloudMQTT (I have zero association with them and all of this and much more can be done on a free account) as the code is already set up for this. The other reason is that I like using glitch.com (another free resource) but they only run on https. It took a bit off effort to figure out how to set this up!!! 

•	You can obviously ignore the ESP32/light/relay thing completely, the rest works independently.

•	I used a stock standard ESP32 chip (<$10) and also a standard OMRON G5LE-14 5V DC , 250VAC relay.

•	A flowchart included in files of variouos components.





