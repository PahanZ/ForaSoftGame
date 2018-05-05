const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uniqueString = require('unique-string');

// our localhost port
const port = 4001;

const choices = [];
const users = {};
const games = {};

const rpsls = (p1, p2) => {
  if (p1 === p2) return 'Ничья!';

  const rules = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  };

  const [first, second] = rules[p1];
  return (p2 === first || p2 === second) ? 'Игрок 1 выиграл!' : 'Игрок 2 выиграл!';
};

io.on('connection', (socket) => {
  let userId;
  let gameId;
  console.log('New user connected');

  socket.on('user id', (id) => {
    if (users[id] !== undefined) {
      io.emit('user id', id);
    } else {
      userId = uniqueString();
      users[userId] = userId;
      io.emit('user id', userId);
    }
  });

  socket.on('start game', () => {
    if (Object.keys(users).length === 2) {
      gameId = uniqueString();
      games[gameId] = {};
      io.emit('start game', true);
      console.log(games, gameId, games.gameId);
    } else {
      io.emit('start game', false);
    }
  });

  socket.on('user choice', (id, userChoice) => {
    console.log(games, gameId, games[gameId]);
    // const user = users[id];
    // choices.push(userChoice);
    // if (choices.length === 2) {
    //   const decision = rpsls(choices[0], choices[1]);
    //   choices.length = 0;
    //   io.emit('decision', decision);

    //   setTimeout(() => {
    //     io.emit('decision', '');
    //   }, 3000);
    // }
  });

  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`);
    io.emit('chat message', msg);
  });

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    delete users[userId];
    console.log('User disconnected');
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
