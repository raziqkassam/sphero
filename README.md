# Controlling the Sphero SPRK+

sphero_dir_receiver.js
- a JS file that runs a python file name that you input
- it then takes whatever is printed from that python file
- you are able to do whatever with that printed and parsed number
- this file runs sphero_dir_thrower.py
- recieves either a 1 or 2 or 3 and moves the sphero based on the number
- stores each of the given directions in an array
- does not work if root is used to call it
- need to make sure that you give permission for BLE to be accessed without root

sphero_dir_thrower.py
- compiles and runs through the running of sphero_dir_receiver.js
- the program should only print numbers, with other specifications
- this file generates a random number from 1 to 100
- prints a 1 or 2 or 3 based on the probability specified for the directions desired

SSVEP_flashingLED3.ino
- Arduino code for the flashing of 3 sets of LED's
- input the desired frequencies, and connect the LED's to the desired pins
- ensure the frequencies are not multiples of each other, such as prime numbers
- the accuracy is unknown at this moment
- uses millis() and time stamping for frequency

drive_rotate_sphero.js
- use the left and right arrow keys to rotate the sphero
- the up arrow is used to go forward
- the speed and time of roll forward is adjustable
- the rotation angle per button click is adjustable
- also allows for rear light toggling with clicking 'b'
- has a sleep delay between each button click

