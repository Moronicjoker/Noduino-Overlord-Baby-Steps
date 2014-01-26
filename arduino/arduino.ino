#include <Servo.h> 

Servo myservo;

int currentPos = -1;

void setup(){
  Serial.begin(115200);
  myservo.attach(9);
  myservo.write(0);
}

void loop(){
  if (Serial.available())  {
     int command = Serial.read();
     
     if ( command == 1 ) {
       turnRight();
     }

     if ( command == 2 ) {
       turnRightS();
     }
     
     
     if ( command == 3 ) {
       center();
     }

     if ( command == 4 ) {
       turnLeftS();
     } 

     
     if ( command == 5 ) {
       turnLeft();
     }      
  }
}

void turnRight(){  
   if( currentPos == 180 ) {
     return;
   };
  
  currentPos = 180;
  myservo.write(180);
};

void turnRightS(){
   if( currentPos == 135 ) {
     return;
  };
  
  currentPos = 135;
  myservo.write(135);
};

void center(){
  if( currentPos == 90 ) {
     return;
  };
  
  myservo.write(90);
  currentPos = 90;
}

void turnLeftS(){
  if( currentPos == 45 ) {
     return;
  };
  
  currentPos = 45;
  myservo.write(45);
};

void turnLeft(){
  if( currentPos == 0 ) {
     return;
  };
  
  currentPos = 0;
  myservo.write(0);
};
