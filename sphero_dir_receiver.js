var mac_id = "C5:9C:75:02:2A:E2"; // BLE ID for the specific Sphero SPRK+ (SK-2AE2)
var sphero = require( "sphero" ),
	sprk = sphero( mac_id ); 

console.log( 'Connecting with Sphero SPRK+ ...' );
sprk.connect(); // connect the robot
console.log( mac_id, 'is successfully connected\n\nProceeding to start' );

var speed = 200; // speed of sphero when driving forward
var heading = 0; // initialize and default set heading to 0 (forward)
var rotation_angle = 45; // set the value of angle change on each side arrow click

sprk.setRgbLed({ red: 0, green: 0, blue: 0 });

const { spawn } = require('child_process');
const directions = []; // Store readings

const sensor = spawn('python', ['sphero_dir_thrower.py']);

sensor.stdout.on('data', function(data) {
    
    // Coerce Buffer object to Float
    directions.push(parseFloat(data));
    
	sprk.setBackLed( 255 ); 
	
	if( directions[ directions.length - 1 ] == 1 ) {
		console.log( 'Clockwise' )
		
		heading = heading + rotation_angle; // change the angle clockwise
		heading = (360 + heading)%360;
		
		sprk.roll(0,heading);
			
	}
	else if( directions[ directions.length - 1 ] == 2 ) {
		console.log( 'Counter Clockwise' )
		
		heading = heading - rotation_angle; // change the angle counter-clockwise
		heading = (360 + heading)%360; // make sure the heading is in the domain of 0<heading<359
			
		sprk.roll(0,heading); // no speed, therefore will only rotate

	}
	else {
		console.log( 'Forward' )
			
		sprk.setMotionTimeout( 1300 ); // only move sphero for specific time in ms
		sprk.roll( speed, heading ); // speed can be changed in line 30
			
	}
    // Log to debug
    console.log(directions);

})



