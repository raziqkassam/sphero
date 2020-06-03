# import RPi.GPIO as GPIO
import time
# import socket
# import sys
#            import sphero

import keyboard

#           from sphero import core

#           s = core.Sphero("/dev/rfcomm0")
print("Connecting to Sphero...")
#           s.connect()
print("Sphero connected")

speed = 0x88

try:
    direction = 'SSSS'
    while True:

        if keyboard.is_pressed('a'): #and direction != 'LLLL':  # left?
            print('left')
            #           s.stop()
            #           s.roll(speed, 90)
            direction = 'LLLL'

        elif keyboard.is_pressed('d'): #and direction != 'RRRR':  # right?
            print('right')
            #           s.stop()
            #           s.roll(speed, 270)
            direction = 'RRRR'

        elif keyboard.is_pressed('w'): #and direction != 'FFFF':  # back?
            print('forward')
            #           s.stop()
            #           s.roll(speed, 1)
            direction = 'FFFF'

        elif keyboard.is_pressed('s'): #and direction != 'BBBB':  # fwd?
            print('backward')
            #           s.stop()
            #           s.roll(speed, 180)
            direction = 'BBBB'

        else:  # stop
            #           print('stop')
            #           s.stop()
            direction = 'SSSS'

        time.sleep(0.1)
except:
    print('error')
