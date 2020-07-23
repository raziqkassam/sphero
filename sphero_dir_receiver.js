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
    
    var str = String(data);
    var search_for = 'Predicted Value:'; // specific line with predicted value
	var word_end = search_for.length + 1; // character number to find the value
	
    for( var i = 0; i < str.length; i++ ) {
		if( str.substring(i,i+16) == search_for ) { // find line that is what you are searching for
			console.log( str.substring(i, i + word_end + 1 ) ); // print out line with value
			directions.push( parseFloat( str[ i + word_end ] )); // add the passed number to the array
		}
	}
	
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
	else if( directions[ directions.length - 1 ] == 3 ) {
		console.log( 'Forward' )
			
		sprk.setMotionTimeout( 400 ); // only move sphero for specific time in ms
		sprk.roll( speed, heading ); // speed can be changed in line 30
			
	}
	else {
		console.log( "Error - value was not found" );
	}
	
    // Log to debug
    console.log(directions);

})



