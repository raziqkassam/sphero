// Functions of the sphero:
// https://github.com/sphero-inc/sphero.js/blob/e9010264a7f8fdca46fb304eb9550b96de036626/lib/devices/sphero.js#L433

var sphero = require("sphero");
sprk = sphero("C5:9C:75:02:2A:E2"); // BLE ID for Sphero SPRK+ (SK-2AE2)

sprk.connect(); // connect the robot (light should turn on)
start();

function start() {		
	var Keys = { left: '\u001b[D', up: '\u001b[A', right: '\u001b[C', down: '\u001b[B' }; //Telnet keyboard equivelant for arrows
	
	var stdin = process.stdin // look for keystrokes in terminal window
	stdin.setRawMode(true); // registers continuous typing (no 'enter' needed)
	stdin.resume(); // process does not exit
	stdin.setEncoding( 'ascii' ); // encoding for recieved data will be readable
	
	stdin.on( 'data', function(key) {
		if( key === '\u0003' ) { // key code for CTRL+C
			console.log( '\nExitting Process\n' );				
			process.exit() // end the program
		}
		else if( key === Keys.left ) { //
			console.log( '\tDriving Left' );
			sprk.roll(70,270); // roll( speed, heading )	
			sprk.setMotionTimeout( 500 ); // only roll for 500ms
			sprk.setRgbLed({ red: 0, green: 0, blue: 255 }); // set light to blue	
		}
		else if( key === Keys.right ) {
			console.log( '\tDriving Right' );	
			sprk.roll(70,90);
			sprk.setMotionTimeout( 500 );
			sprk.setRgbLed({ red: 255, green: 0, blue: 0 }); // set light to red	
		}
		else if( key === Keys.up ) {
			console.log( '\tDriving Forwards\n' );
			sprk.roll(70,0);
			sprk.setMotionTimeout( 500 );
			sprk.setRgbLed({ red: 0, green: 255, blue: 0 }); // set light to green	
		}
		else if( key === Keys.down ) {
			console.log( '\tDriving Backwards' );
			sprk.roll(70,180);
			sprk.setMotionTimeout( 500 );
			sprk.setRgbLed({ red: 255, green: 255, blue: 0 }); // set light to yellow			
		}
		process.stdout.write( key ); // output the keystroke (letter or number if mistyped)
	});
}





