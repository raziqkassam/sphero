// Author: Raziq Kassam
//
// Arduino Code for flashing of 3 sets of LED's at different desired frequencies
// NOTE: Accuracy of frequency is unknown

// input the desired pins for the sets of LED's
int LED1 = 2; // blue light   -  driving forward
int LED2 = 4; // red light    -  counter clockwise rotation
int LED3 = 6; // yellow light -  clockwise location

// input the desired frequencies for the lights, units being Hz
int freq1 = 13; 
int freq2 = 19; 
int freq3 = 25; 

const unsigned long LED1_interval = 1000/freq1; // period = 1 / frequency
const unsigned long LED2_interval = 1000/freq2; // seconds = 1 / Hertz
const unsigned long LED3_interval = 1000/freq3; // units in milliseconds (seconds/1000)

unsigned long LED1_timer;
unsigned long LED2_timer;
unsigned long LED3_timer;

void setup() {
  pinMode(LED1, OUTPUT); // set up the pins
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);

  LED1_timer = millis(); // declare timer values
  LED2_timer = millis();
  LED3_timer = millis();
}

void toggle1() { // toggling the on/off of the first LED
  if( digitalRead( LED1 ) == LOW ) // if off, turn on
    digitalWrite(LED1, HIGH);
  else
    digitalWrite(LED1, LOW); // if on, turn off

  LED1_timer = millis(); // update the timer
}

void toggle2() {
  if( digitalRead( LED2 ) == LOW )
    digitalWrite(LED2, HIGH);
  else
    digitalWrite(LED2, LOW);

  LED2_timer = millis();
}

void toggle3() {
  if( digitalRead( LED3 ) == LOW )
    digitalWrite(LED3, HIGH);
  else
    digitalWrite(LED3, LOW);

  LED3_timer = millis();
}

void loop() {
  if( (millis() - LED1_timer) >= LED1_interval ) // when the timer/delay is done
    toggle1(); // toggle the respective LED pin

  if( (millis() - LED2_timer) >= LED2_interval )
    toggle2();

  if( (millis() - LED3_timer) >= LED3_interval )
    toggle3();
}
