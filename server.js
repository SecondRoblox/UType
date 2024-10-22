const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Store messages in memory
const messages = [];

// Handle incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send the existing messages to the new user
    socket.emit('chat history', messages);

    // Handle incoming chat messages
    socket.on('chat message', (msg) => {
        messages.push(msg); // Save message to the array
        io.emit('chat message', msg); // Broadcast the message to all users
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
