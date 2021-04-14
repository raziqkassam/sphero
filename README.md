# Controlling the Sphero SPRK+

BME Abstract
- showcases the project goal
- background of the specific BCI process
- methods and results

# stream_EEG_data.py
- file that streams EEG data from https://github.com/sylvchev/dataset-ssvep-exoskeleton
- simulates SSVEP paradigm, allows for offline streamig data analysis
- various pipelines and subject data is all available
- delay and run time are all adjustable
- finds predicted values in the range of 1-4
- pushes the value into an empty text file
- Main Author: Eli Kinney-Lang (@ekinney-lang)

sphero_dir_receiver.js
- a JS file that runs a python file name that you input (ex. stream_EEG_data.py)
- the python file pushes values to a text file
- this file reads the values (one number per line)
- controlls the sphero based on the number found in the file
- rotates both directions or drives forward (with one resting state)

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

