# Controlling the Sphero SPRK+

drive_sphero.js
- use the arrow keys to control the Sphero SPRK+
- changes the LED lights based on each direction
- The Sphero only moves for 500ms at speed 70
- connects through node.js ble connector
- better at registering continuous clicks
- can use 'b' to toggle the rear light
  - shows the back of robot, for direction

drive_sphero.go
- uses arrow keys to control Sphero SPRK+
- changes the LED lights based on each direction
- connects through Gobot (must have Go and Gobot installed)
- registers continuous keystrokes, will execute them all eventually


Notes:
- will need to adjust the connection based on the specific robot used
  - for JS, change the MAC ID in the file
  - for GO, call the program by the specific friendly name (ex. SK-####)
- both files have occasional connection errors based on BLE
  - the JS file is more reliable and functions properly more often

