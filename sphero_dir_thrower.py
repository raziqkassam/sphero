
import time
import random

cw_probability  = 40 
ccw_probability = 40 
fwd_probability = 20

upper_limit = cw_probability + ccw_probability + fwd_probability # totals

limit_1 = 0 + cw_probability 
limit_2 = 100 - fwd_probability

direction = 0 # initialize variable to keep track

while True :
    number = random.randint(1,upper_limit) # generate random number between 1 and upper_limit
    time.sleep(3) # wait 3 seconds before outputting random number
    
    if number < limit_1 :
        print( "Analyzed 13Hz \nSphero will now rotate clockwise" ) # printing distraction
        direction = 1 # update variable to print
        print( "Predicted Value:", direction, flush=True, end='') # print code with settings
        
    if limit_1 <= number < limit_2 :
        print( "Analyzed 19Hz \nSphero will now rotate counter clockwise" )
        direction = 2
        print( "Predicted Value:", direction, flush=True, end='')
        
    if number >= limit_2 :
        print( "Analyzed 25Hz \nSphero will now move forward" )
        direction = 3
        print( "Predicted Value:", direction, flush=True, end='')
        
# LEGEND
# 1 --> CLOCKWISE
# 2 --> COUNTER CLOCKWISE
# 3 --> FORWARD
