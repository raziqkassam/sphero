// Author: Raziq Kassam

// $sudo node sphero_dir_receiver.js

var mac_id = "C5:9C:75:02:2A:E2"; // BLE ID for the specific Sphero SPRK+ (SK-2AE2)
var sphero = require( "sphero" ),
	sprk = sphero( mac_id ); 

console.log( 'Connecting with Sphero SPRK+ ...' );
sprk.connect(); // connect the robot
console.log( mac_id, 'is successfully connected\n\nProceeding to start' );

var speed = 200; // speed of sphero when driving forward
var heading = 0; // initialize and default set heading to 0 (forward)
var timeout = 600 // specific time for sphero to roll for (ms)
var rotation_angle = 45; // set the value of angle change on each side arrow click

sprk.setRgbLed({ red: 0, green: 0, blue: 0 }); // turn off the main LED's
sprk.setBackLed( 255 ); // turn on the blue rear LED

const { spawn } = require('child_process'); // communication channel (to run python file)
const fs = require('fs'); // file system

//const sensor = spawn('python3', ['sphero_dir_thrower.py']);
const sensor = spawn('python3', [ 'stream_EEG_data.py' ]); // runs the file name in python3

var directions = []; // Store readings and values read from the .txt file
var stream_start = false; // changes to true when stream file begins to run

sensor.stdout.on('data', function(data) {
	// console.log( String(data) );
	if( !stream_start && String(data) == 'Simulate Online is True' ) { 
		console.log( 'Stream is starting... \nBeginning to find predicted values\n\n' );
		stream_start = true; // will be true when key sentence is found in file
	}
   
	if( stream_start ) { // if the key sentence was found, and the stream has started
		
		// input the file into an array, split by new lines (each line should have one number
		var directions = fs.readFileSync('directions.txt').toString().split("\n");

		if( directions[ directions.length - 1 ] == '1' ) { // uses the last pushed direction 
			console.log( 'Found 1 --> Rotate Clockwise' ) // print value and action
		
			heading = heading + rotation_angle; // change the angle clockwise
			heading = (360 + heading)%360; // ensure the value stays in range 0<heading<359
		
			sprk.roll(0,heading); // rotate sphero (no speed as doesn't move)
		
		}
		else if( directions[ directions.length - 1 ] == '2' ) {
			console.log( 'Found 2 --> Rotate Counter Clockwise' )
			
			heading = heading - rotation_angle; // change the angle counter-clockwise
			heading = (360 + heading)%360; // make sure the heading is in the domain of 0<heading<359
				
			sprk.roll(0,heading); // no speed, therefore will only rotate

		}
		else if( directions[ directions.length - 1 ] == '3' ) {
			console.log( 'Found 3 --> Driving Forward' )
			
			sprk.setMotionTimeout( timeout ); // only move sphero for specific time in ms
			sprk.roll( speed, heading ); // speed and heading can be altered at top
					
		}
		else if ( directions[ directions.length - 1 ] == '4' ) {
			console.log( 'Found 4 --> Resting' ); // fourth option, however no action is done
		}
		
		console.log( directions ); // log the array with all the number values to keep track
	}
})
