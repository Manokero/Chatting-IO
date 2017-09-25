 const express = require('express'),
 	   app	   = express(),
 	   server  = require('http').Server(app),
 	   io	   = require('socket.io')(server),
 	   port    = process.env.PORT || 3000 ;

var 	n = 0,
	users = [],
	hora  = '';


app.use("/files",express.static('files'))



app.get('/',function(req,res) {
	res.sendFile(__dirname+'/files/index.html')
})


app.use(function (req,res,next){
	res.status(404).sendFile(__dirname+"/files/404.html")
})

io.on('connection',function(socket){
	
	socket.on('username', function(username){
		n++
		socket.username = username
		users.push(socket.username);
		socket.broadcast.emit('new user',socket.username)
		io.emit("send users",{
			name: users,
			conect: n
		})

	})

	socket.on('send message',function(msg) {
		msg = socket.username + ': ' + msg
		io.emit('show message',{msg: msg})
	})

	socket.on('disconnect',function(){
		if(socket.username) {
			users.splice(users.indexOf(socket.username),1)
			n--
		}
		io.emit('send users',{name: users, conect:n})
		io.emit('show message',{user: socket.username})
	})
})


server.listen(port)