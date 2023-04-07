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

const adjectives = ['happy', 'silly', 'funny', 'clever', 'wise', 'smart', 'brave'];
const nouns = ['cat', 'dog', 'hamster', 'elephant', 'lion', 'tiger', 'penguin'];

// Keep track of connected users
let connectedUsers = [];

function generateRandomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}-${noun}`;
}

io.on('connection', (socket) => {

  const name = generateRandomName();
  console.log(name + ' connected');

  // Add user to connectedUsers array
  connectedUsers.push(name);

  // Emit updated connectedUsers array to all connected clients
  io.emit('users', connectedUsers);

  socket.emit('name', name);

  socket.on('disconnect', () => {
    console.log(name + ' disconnected');
    // Remove user from connectedUsers array
    connectedUsers = connectedUsers.filter(user => user !== name);
    // Emit updated connectedUsers array to all connected clients
    io.emit('users', connectedUsers);
  });
});

server.listen(3001, () => {
  console.log('Server started on port 3001');
});
