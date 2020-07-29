// Author: Raziq Kassam
// sudo node sphero_dir_receiver.js

var mac_id = "C5:9C:75:02:2A:E2"; // BLE ID for the specific Sphero SPRK+ (SK-2AE2)
var sphero = require( "sphero" ),
	sprk = sphero( mac_id ); 

console.log( 'Connecting with Sphero SPRK+ ...' );
sprk.connect(); // connect the robot
console.log( mac_id, 'is successfully connected\n\nProceeding to start' );

var speed = 200; // speed of sphero when driving forward
var heading = 0; // initialize and default set heading to 0 (forward)
var rotation_angle = 45; // set the value of angle change on each side arrow click

sprk.setRgbLed({ red: 0, green: 0, blue: 0 }); // turn off the main LED's
sprk.setBackLed( 255 ); // turn on the blue rear LED

const { spawn } = require('child_process');
const fs = require('fs');

//const sensor = spawn('python3', ['sphero_dir_thrower.py']);
const sensor = spawn('python3', [ 'stream_EEG_data.py' ]);

var directions = []; // Store readings
var index = 0;
var stream_start = false;

sensor.stdout.on('data', function(data) {
	// console.log( String(data) );
	if( !stream_start && String(data) == 'Simulate Online is True' ) {
		console.log( 'Stream is starting... \nBeginning to find predicted values\n\n' );
		stream_start = true;
	}
   
	if( stream_start ) {
		
		var directions = fs.readFileSync('directions.txt').toString().split("\n");

		if( directions[ directions.length - 1 ] == '1' ) {
			console.log( 'Found 1 --> Rotate Clockwise' )
		
			heading = heading + rotation_angle; // change the angle clockwise
			heading = (360 + heading)%360;
		
			sprk.roll(0,heading);
		
		}
		else if( directions[ directions.length - 1 ] == '2' ) {
			console.log( 'Found 2 --> Rotate Counter Clockwise' )
			
			heading = heading - rotation_angle; // change the angle counter-clockwise
			heading = (360 + heading)%360; // make sure the heading is in the domain of 0<heading<359
				
			sprk.roll(0,heading); // no speed, therefore will only rotate

		}
		else if( directions[ directions.length - 1 ] == '3' ) {
			console.log( 'Found 3 --> Driving Forward' )
			
			sprk.setMotionTimeout( 400 ); // only move sphero for specific time in ms
			sprk.roll( speed, heading ); // speed can be changed in line 30
					
		}
		else if ( directions[ directions.length - 1 ] == '4' ) {
			console.log( 'Found 4 --> Resting' );
		}
		
		console.log( directions ); // log to debug
	}
})
