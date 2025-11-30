const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, 'public')));


const iceConfiguration = {
    iceServers: [
        {
            urls: 'turn:0.tcp.in.ngrok.io:11918?transport=tcp',  
            username: 'aaa',                          
            credential: 'aaa',                        
        },
        {
            urls: 'turn:0.tcp.in.ngrok.io:15143?transport=tcp',  
            username: 'aaa',                          
            credential: 'aaa',                        
        },

    ]
};

app.get('/api/ice-config', (req, res) => {
    res.json(iceConfiguration);
});

const rooms = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('create-room', (roomId) => {
        if (rooms[roomId]) return socket.emit('error', 'Room exists');
        rooms[roomId] = { hostId: socket.id };
        socket.join(roomId);
        console.log(`Room ${roomId} created`);
        socket.emit('room-created', roomId);
    });

    socket.on('join-room', (roomId) => {
        const room = rooms[roomId];
        if (!room) return socket.emit('error', 'Room not found');
        socket.join(roomId);
        io.to(room.hostId).emit('user-joined', socket.id);
        socket.emit('joined-room', roomId);
    });

    // Relay WebRTC Signals
    socket.on('offer', p => io.to(p.target).emit('offer', p));
    socket.on('answer', p => io.to(p.target).emit('answer', p));
    socket.on('ice-candidate', p => io.to(p.target).emit('ice-candidate', p));

    socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));