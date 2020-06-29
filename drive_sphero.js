// Functions of the sphero:
// https://github.com/sphero-inc/sphero.js/blob/e9010264a7f8fdca46fb304eb9550b96de036626/lib/devices/sphero.js#L433

var mac_id = "C5:9C:75:02:2A:E2"; // BLE ID for the specific Sphero SPRK+ (SK-2AE2)
var sphero = require( "sphero" ),
	sprk = sphero( mac_id ); 

console.log( 'Connecting with Sphero SPRK+ ...' );
sprk.connect(); // connect the robot (light should turn on)
console.log( mac_id, 'is successfully connected\n\nProceeding to start' );
arrowKey_control();
console.log( 'The Sphero is ready to drive:\n\t\tUse the arrow keys for manual control' );
console.log( '\t\tPress [b] to toggle the rear light for direction' );
console.log( '\t\tPress [Ctrl+c] at any time to quit the program\n' );

function arrowKey_control() {		
	var Keys = { left: '\u001b[D', up: '\u001b[A', right: '\u001b[C', down: '\u001b[B' }; 
	//Telnet keyboard equivelant for arrows
	var toggle = true; // bool value for toggling rear light
	var direction = 'start'; // values to keep track of latest direction
	var dir_history = []; // array to keep track of past directions and limits
	var dir_limit = 'none'; // used as a 4-way bool to determine a direction limit
	var limit_value = 4; // the value of how many times you can travel the same direction
	var time_reg = 400; // ms
	var time_180 = 700; // ms
	var sphero_speed = 80; // speed of the sphero, used in roll functions
	
	var stdin = process.stdin // look for keystrokes in terminal window
	stdin.setRawMode( true ); // registers continuous typing (no 'enter' needed)
	stdin.resume(); // process wil not exit
	stdin.setEncoding( 'ascii' ); // encoding for recieved data will be readable
	
	stdin.on( 'data', function( key ) {
		sprk.setRgbLed({ red: 0, green: 0, blue: 0 }); // turn off the main LED's

		if( key === '\u0003' ) { // key code for CTRL+C
			console.log( '\nExitting Process...\nEnsure the Sphero is off before reuse\n' );				
			process.exit() // end the program
		}
		else if( key === 'b' ) { 
			if( toggle ) {
				sprk.setBackLed( 255 ); // press 'b' to show back light
				toggle = false;
			}
			else {
				sprk.setBackLed( 0 ); // press again to turn off light
				toggle = true;
			}
		}
		else if( key === Keys.left && dir_limit != 'left' ) { // if left is clicked and hasn't been pressed 'limit_value' times before
			if( direction === 'right' ) // if opposite direction, needs more time to rotate and move
				sprk.setMotionTimeout( time_180 );
			else 
				sprk.setMotionTimeout( time_reg ); // standard time, only rolls for 400ms
				
			sprk.roll( sphero_speed, 270 ); // roll( speed, heading )
			console.log( '\tDriving Left' ); // print out the direction moved
			direction = 'left'; // logs the latest direction moved
			dir_limit = 'none' // reset the direction limit
		}
		else if( key === Keys.right && dir_limit != 'right' ) {
			if( direction === 'left' )
				sprk.setMotionTimeout( time_180 );
			else 
				sprk.setMotionTimeout( time_reg );
			
			sprk.roll( sphero_speed, 90 );	
			console.log( '\tDriving Right' );	
			direction = 'right';
			dir_limit = 'none'	
		}
		else if( key === Keys.up && dir_limit != 'up' ) {
			if( direction === 'down' ) 
				sprk.setMotionTimeout( time_180 )
			else 
				sprk.setMotionTimeout( time_reg );
			
			sprk.roll( sphero_speed, 0 );
			console.log( '\tDriving Forwards' );
			direction = 'up';
			dir_limit = 'none'	
		}
		else if( key === Keys.down && dir_limit != 'down' ) {
			if( direction === 'up' )
				sprk.setMotionTimeout( time_180 );
			else
				sprk.setMotionTimeout( time_reg );
				
			sprk.roll( sphero_speed, 180 );	
			console.log( '\tDriving Backwards' );
			direction = 'down';
			dir_limit = 'none'	
		}
		
		sprk.setStabilization( 1 );
		dir_history[ dir_history.length ] = direction; // update the array with the latest direction
		
		if( dir_history.length > limit_value-1 ) { // if there are more values in the array then the desired limit
			var last_dir = dir_history[ dir_history.length-1 ]; // variable for the last direction (could also use 'direction')
			var limit = true; // boolean to keep track of if the past 'limit_value' directions were the same
		
			for( i = dir_history.length-1; i > dir_history.length-limit_value-1 && limit; i-- ) {
				if( last_dir != dir_history[ i ] )
					limit = false; 
			// for loop will keep limit true if the past 'limit_value' directions were the same, else will be false
			}
			if( limit )
					dir_limit = last_dir; // limit is set to the direction that was repeated 'limit_value' times
		}
	});
}

