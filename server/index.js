const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

// Keep track of connected users
let connectedUsers = [];



io.on('connection', (socket) => {

  socket.on('new user', (name) => {
    socket.name = name;
    connectedUsers.push(name);
    io.emit('users', connectedUsers);
  });

  socket.on('disconnect', () => {
    console.log(socket.name + ' disconnected');
    connectedUsers = connectedUsers.filter(user => user !== socket.name);
    io.emit('users', connectedUsers);
  });
});

server.listen(3001, () => {
  console.log('Server started on port 3001');
});
