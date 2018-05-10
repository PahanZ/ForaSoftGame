const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uniqueString = require('unique-string');

// our localhost port
const port = 4001;

const users = {};
const games = {};
const choices = [];
const gameId = uniqueString();
let count = 1;

const rpsls = (p1, p2) => {
  if (p1.userChoice === p2.userChoice) return 'Ничья!';

  const rules = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  };

  const [first, second] = rules[p1.userChoice];
  return (p2.userChoice === first || p2.userChoice === second) ?
    `${p1.playerName} выиграл!`
    : `${p2.playerName} выиграл!`;
};

const createUser = (userId, socketId) => {
  users[userId] = {
    userId,
    playerName: `Player ${count}`,
    gameId,
    socketId,
  };
  count += 1;
};

io.on('connection', (socket) => {
  let userId;
  console.log('New user connected');

  socket.on('start game', (inviteId, id) => {
    let newId = id;
    if (users[newId] === undefined) {
      userId = uniqueString();
      newId = userId;
      createUser(userId, socket.id);
      const { socketId } = users[newId];
      io.sockets.sockets[socketId]
        .emit('start game', false, { newId, name: users[userId].playerName });
      console.log(users[newId]);
    }
    if (users[inviteId]) {
      games[gameId] = {};
      games[gameId][inviteId] = {
        id: inviteId,
        move: '',
        socketId: users[inviteId].socketId,
      };
      games[gameId][newId] = {
        id: newId,
        move: '',
        socketId: users[newId].socketId,
      };
      Object.values(games[gameId]).forEach((el) => {
        io.sockets.sockets[el.socketId].emit('start game', true);
      });
    }
  });

  socket.on('user choice', (id, userChoice, playerName) => {
    if (users[id]) {
      games[gameId][id].move = userChoice;
      choices.push({ playerName, userChoice });

      if (choices.length === 2) {
        const decision = rpsls(choices[0], choices[1]);
        choices.length = 0;
        io.emit('decision', decision);

        setTimeout(() => {
          io.emit('decision', '');
        }, 3000);
      }
    }
  });

  socket.on('chat message', (name, msg) => {
    io.emit('chat message', name, msg);
  });

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    // delete users[userId];
    console.log('User disconnected');
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
