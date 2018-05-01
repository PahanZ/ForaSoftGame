const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// our localhost port
const port = 4001;

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    console.log('New user connected');
    const connectionsLength = io.sockets.server.httpServer.connections;
    console.log(connectionsLength)
    if (connectionsLength === 2) {
        io.emit('start', true);
        console.log('startGame')
    }
    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});

http.listen(port, () => console.log(`Listening on port ${port}`))