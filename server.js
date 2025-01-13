const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static('public'));

// Handle new client connections
io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Broadcast when a user sends a message, except to the sender
  socket.on('chatMessage', (msg) => {
    // Emit the message to all clients except the sender
    socket.broadcast.emit('chatMessage', msg);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
