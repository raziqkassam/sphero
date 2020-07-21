
import time
import random

cw_probability  = 40 # %
ccw_probability = 40 
fwd_probability = 20

upper_limit = cw_probability + ccw_probability + fwd_probability

limit_1 = 0 + cw_probability
limit_2 = 100 - fwd_probability

direction = 0

while True :
    number = random.randint(1,upper_limit)
    time.sleep(3)
    
    if number < limit_1 :
        #print( "Analyzed 13Hz \nSphero will now rotate clockwise" )
        #keyboard.press_and_release('d')
        direction = 1
        print( direction, flush=True, end='')
        
    if limit_1 <= number < limit_2 :
        #print( "Analyzed 19Hz \nSphero will now rotate counter clockwise" )
        #keyboard.press_and_release('a')
        direction = 2
        print( direction, flush=True, end='')
        
    if number >= limit_2 :
        #print( "Analyzed 25Hz \nSphero will now move forward" )
        #keyboard.press_and_release('w')
        direction = 3
        print( direction, flush=True, end='')
        

