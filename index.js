var express = require('express'); 
var chat = express(); 
var request = require('request');
var cors = require('cors'); 
var bodyParser = require('body-parser');
var morgan = require('morgan');
var url = "http://34.210.35.174:7000"

var server = chat.listen(3000, function(){
	console.log('Hearing Port 3000'); 
})
var socket_io = require('socket.io')(server);
//------------------------------------------------

chat.use(bodyParser.json());
chat.use(cors());
chat.use(express.static('html'))
chat.get('/', function(req, res){
	res.sendFile('./html/index.html', { root: __dirname })
})

var messages = []; 
get_messages(); 

socket_io.on('connection', function(server_socket){
	server_socket.emit('chat', messages); 
	server_socket.on('message', function(messages){
		request.post({
			url: url, 
			form: {
				"student_id": messages.student_id, 
				"text": messages.text, 
				"nick": messages.nick
			}
			}, 
			function(err, httpResponse, body){
				console.log(messages);
				console.log(httpResponse);
		})
	})
})

setInterval(function(){
	get_messages();
}, 8000); 

function get_messages(){
	request.get(url, function(error, response, body){
		let ping = JSON.parse(body); 
		if(messages.length != ping.length){
			messages = ping;

			socket_io.sockets.emit('chat', messages); 
		}
	})
}