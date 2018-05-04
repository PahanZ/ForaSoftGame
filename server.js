const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// our localhost port
const port = 4001;

const choices = [];

const rpsls = (p1, p2) => {
    if (p1 === p2) return 'Ничья!';
    const rules = { rock: ["scissors", "lizard"], paper: ["rock", "spock"], scissors: ["paper", "lizard"], lizard: ["spock", "paper"], spock: ["scissors", "rock"] };
    [first, second] = rules[p1];
    return (p2 === first || p2 === second) ? 'Игрок 1 выиграл!' : 'Игрок 2 выиграл!';
};

io.on('connection', socket => {
    console.log('New user connected');
    http.getConnections((err, countUsers) => {
        console.log(countUsers)
        io.emit('count', countUsers);
    });
    socket.on('user choice', userChoice => {
        choices.push(userChoice);
        if (choices.length === 2) {
            let decision = rpsls(choices[0], choices[1]);
            choices.length = 0;
            io.emit('decision', decision);
            setTimeout(() => {
                io.emit('decision', '');
            }, 3000);
        }
    });
    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});

http.listen(port, () => console.log(`Listening on port ${port}`))