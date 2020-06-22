// Functions of the sphero:
// https://github.com/sphero-inc/sphero.js/blob/e9010264a7f8fdca46fb304eb9550b96de036626/lib/devices/sphero.js#L433

var id = "C5:9C:75:02:2A:E2"; // BLE ID for the specific Sphero SPRK+ (SK-2AE2)
var sphero = require( "sphero" ),
	sprk = sphero( id ); 

console.log( 'Connecting with Sphero SPRK+ ...' );
sprk.connect(); // connect the robot (light should turn on)
console.log( id, 'is successfully connected\n\nProceeding to start' );
start();
console.log( 'The Sphero is ready to drive:\n\t\tUse the arrow keys for manual control' );
console.log( '\t\tPress [b] to toggle the rear light for direction' );
console.log( '\t\tPress [Ctrl+c] at any time to quit the program\n' );

function start() {		
	var Keys = { left: '\u001b[D', up: '\u001b[A', right: '\u001b[C', down: '\u001b[B' }; 
	//Telnet keyboard equivelant for arrows
	var toggle = true;	

	var stdin = process.stdin // look for keystrokes in terminal window
	stdin.setRawMode( true ); // registers continuous typing (no 'enter' needed)
	stdin.resume(); // process wil not exit
	stdin.setEncoding( 'ascii' ); // encoding for recieved data will be readable
	sprk.setRgbLed({ red: 0, green: 0, blue: 0 });

	stdin.on( 'data', function( key ) {
		sprk.setRgbLed({ red: 0, green: 0, blue: 0 });

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
				sprk.setBackLed( 0 );
				toggle = true;
			}
		}
		else if( key === Keys.left ) { 
			console.log( '\tDriving Left' );
			sprk.roll( 70, 270 ); // roll( speed, heading )	
		}
		else if( key === Keys.right ) {
			console.log( '\tDriving Right' );	
			sprk.roll( 70, 90 );	
		}
		else if( key === Keys.up ) {
			console.log( '\tDriving Forwards\n' );
			sprk.roll( 70, 0 );
		}
		else if( key === Keys.down ) {
			console.log( '\tDriving Backwards' );
			sprk.roll( 70, 180 );			
		}
		sprk.setMotionTimeout( 500 ); // only roll for 500ms
		process.stdout.write( key ); // output the keystroke (letter or number if mistyped)
	});
}

