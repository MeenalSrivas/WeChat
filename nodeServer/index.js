//node server which will handle the socket.io connection
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);  // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
}); 


const users= {};

io.on('connection' ,(socket) =>{
    //console.log("new user logged");
    socket.on("new-user-joined" , name =>{
        console.log("new user", name);
        users[socket.id] =name;
        socket.broadcast.emit("user-joined", name)
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {name: users[socket.id], message:message })
    }); // server on receiving message runs an 'send' event in which 
    // the server will emit the message 
    // and the user name to all the other users 

    socket.on('disconnect', message =>{
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    })
});






server.listen(8000, () => {
    console.log('listening on *:8000');
  });
