Noduino-Overlord-Baby-Steps
===========================

A rather clumsy, but working, attempt to control a servo via a node.js - serial - arduino setup. 

0. push content of arduino folder onto arduino & connect servo and arduino, take a look at the jpg
1. setup arduino serial/usb connection
2. install node.js
3. start server via command line -> node server.js
4. install missing node modules with npm. example: npm install websocket
5. enter the actual address of your arduino/serial connection in line 10 in server.js 
6. when server is running: open a browser ( http://localhost:8080/ ) 
7. move mouse from left to right
8. Tada! keep fire extinguisher at hand :D
