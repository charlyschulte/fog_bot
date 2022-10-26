# Description
Connect a fog maschine using tasmota to the analog input (to measure the current of the leds on the remote) and the remote button to a relais which is also conntected to tasmota
then run this script, which gives you a webserver to interact with the fog maschine, trigger it and also run a cue list in the background to check if the fog is availiable.

# why it was build
used in combination with the twitch bot to let the chat trigger the fog maschine and check if its avaliable beforehand, so no channel points are lost if the device is currently in a heating phase.

# How to connect fog maschine to tasmota?
Use the led wires (15v), connect it to a 1kohm resistor and a 100ohm resistor (voltage devider: https://ohmslawcalculator.com/voltage-divider-calculator) 
to get 1,3V out of it. connect the wires to ground and the analog input of the wemos d1, also connect the physical button of the fog remote to a relais and connect it to d1 of the wemos.
## next
install tasmota on the device and put a0 into analog mode and d1 into relais mode.

# fog maschine used
Showlite SN-1200 Nebelmaschine
https://amzn.to/3MuinKp (ref link)

# Install
1) clone repository
2) run "npm i"
3) update settings.json 
4) run "node index.js"

# Trigger fog maschine
run "http://localhost:3000/fog"
