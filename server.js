var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
var WebSocketServer = require('websocket').server;

// SERIAL
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; 
var serialPort = new SerialPort("/dev/ttyACM0", { // set to local address
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('---> ' + data);
  });

});


// HTTP Server
var server = http.createServer(function(req, res) {

    var reqObject = url.parse(req.url, true);

    var action = reqObject.pathname;
	
	console.log('action: -',action,'-');

	try {
		if(action == '/'){
		
			var file = fs.readFileSync('./index.html');
			
			res.writeHead(200, {'content-type': 'text/html'}); 
		
		} else {
		
			var file = fs.readFileSync('.'+action);
		
			res.writeHead(200, {'Content-Type': mime.lookup('.'+action)});
	        
		};
	} catch (e) {
		console.log(e);
	};
		
	res.end(file, 'binary');
}).listen(8080);



// WEBSOCKET 
wsServer = new WebSocketServer({
	httpServer: server
});

var connectionIDCounter = 0;
var allConnections = {};

wsServer.on('request',function(request) {
	var connection = request.accept(null,request.origin);
	connection.id = connectionIDCounter ++;
	allConnections[connection.id] = connection;
	
	// on message
	connection.on('message',function(message){
			var messageObject = JSON.parse( message.utf8Data );
			var hex = messageObject.count.toString(16);
			serialPort.write ( new Buffer([hex]) ); 
	});
	
	// on close
	connection.on('close',function() {
		delete allConnections[connection.id];
	});
});


