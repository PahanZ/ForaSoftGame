const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// our localhost port
const port = 4001;

const choices = [];

io.on('connection', socket => {
    console.log('New user connected');
    http.getConnections((err, countUsers) => {
        console.log(countUsers)
        io.emit('count', countUsers);
    });
    socket.on('user choice', userChoice => {
        // console.log('choice: ' + userChoice);
        choices.push(userChoice);
        console.log(choices);
    });
    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});

http.listen(port, () => console.log(`Listening on port ${port}`))