const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uniqueString = require('unique-string');

// our localhost port
const port = 4001;

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

const gameId = uniqueString();

io.on('connection', (socket) => {
  let userId;
  console.log('New user connected');

  socket.on('user id', (id) => {
    if (users[id] === undefined) {
      userId = uniqueString();
      users[userId] = {
        userId,
        gameId,
      };
      io.emit('user id', userId);
    }
  });

  socket.on('start game', (inviteId, id) => {
    if (users[inviteId]) {
      games[gameId] = {};
      games[gameId][inviteId] = {
        id: inviteId,
        move: '',
      };
      games[gameId][id] = {
        id,
        move: '',
      };
      io.emit('start game', true);
    } else {
      io.emit('start game', false);
    }
  });

  socket.on('user choice', (id, userChoice) => {
    games[gameId][id].move = userChoice;
    console.log('games:', games);
    console.log('id, choice:', id, userChoice);
    // console.log('users:', users);
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
