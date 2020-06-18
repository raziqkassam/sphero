// Call on this program [must be in same directory] through: 
// $ go build drive_sphero.go // builds the program based on latest saved version
// $ sudo ./drive_sphero SK_2AE2 // runs program and passes the correct SPRK+ address

package main

import (
	"fmt"
	"os"
        "time"

	"gobot.io/x/gobot" // gobot framework
	
	"github.com/eiannone/keyboard" // for keyboard commands
	
        "gobot.io/x/gobot/platforms/ble" // connecting through BLE
        "gobot.io/x/gobot/platforms/sphero/sprkplus" // SPRK specific commands
)

/*
https://github.com/hybridgroup/gobot/blob/master/platforms/sphero/sphero_driver.go
^^ Website for the sphero driver various function calls
*/

func main() {
	bleAdaptor := ble.NewClientAdaptor(os.Args[1]) // gets passed when program is called
        sprk := sprkplus.NewDriver(bleAdaptor)
	
	// setting color variables as max on each
	r := uint8(255)
      	g := uint8(255)
     	b := uint8(255)
      	
	work := func() {
		fmt.Printf("Opening Keyboard\n")
		if err := keyboard.Open(); err != nil { // open the keyboard
			panic(err)
		}
		fmt.Printf("Keyboard is open\n")			
		var exit bool	
		fmt.Printf("Press Ctrl+C to exit at any time\n")
		fmt.Printf("Use the Arrows to Control Sphero\n")
			
		for !exit { // will run infinitely until CTRL+C is pressed
			char, key, err := keyboard.GetKey() // always searching for keys
			//keysEvent, err := keyboard.GetKeys(1)
			if err != nil {
				panic(err)
			}
			//key := <-keysEvent
			switch {
			case key == keyboard.KeyArrowUp:
				fmt.Printf("You pressed Up\t\t\tDriving Forward\n")
				sprk.SetRGB(r, 0, 0) // RED
				sprk.Roll(50,0) // 100 speed, heading forward
			case key == keyboard.KeyArrowRight:
				fmt.Printf("You pressed Right\t\tDriving Right\n")
				sprk.SetRGB(0, 0, b) // BLUE 
				sprk.Roll(50,90) // 100 speed, heading right
			case key == keyboard.KeyArrowLeft:
				fmt.Printf("You pressed Left\t\tDriving Left\n")
				sprk.SetRGB(0, g, 0) // GREEN
				sprk.Roll(50,270) // 100 speed, heading left
			case key == keyboard.KeyArrowDown:
				fmt.Printf("You pressed Down\t\tDriving Backwards\n")
				sprk.SetRGB(r, g, b) // WHITE
				sprk.Roll(50,180) // 100 speed, heading backwards
			case key == keyboard.KeyCtrlC:
				fmt.Printf("You want to Exit\n")
				exit = true // loop will no longer continue, will exit
			default:
				fmt.Printf("You pressed ", char)
			}
			time.Sleep((1)*time.Second) // wait the time before next loop
			sprk.Stop() // stop rolling
		}
		fmt.Printf("Proceeding to Exit...\n") // exits when CTRL+C is pressed
		_ = keyboard.Close() // close keyboard
		fmt.Printf("Keyboard is Closed\nPress Ctrl+C again to Exit Program\n")
	}
	
	robot := gobot.NewRobot("sprkBot",
                []gobot.Connection{bleAdaptor},
                []gobot.Device{sprk},
                work,
        )

	robot.Start()
}
