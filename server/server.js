const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uniqueString = require('unique-string');
const rpsls = require('./rpsls');
const { users, games, choices } = require('./store');
const createUser = require('./createUser');
const createGame = require('./createGame');

// our localhost port
const port = 4001;
const gameId = uniqueString();

io.on('connection', (socket) => {
  console.log('New user connected');
  let { id } = socket.handshake.query;

  if (users[id] === undefined) {
    id = uniqueString();
    createUser({ id, gameId, socketId: socket.id });
    socket.emit('user data', { id, name: users[id].playerName });
  }
  socket.on('start game', (inviteId) => {
    if (users[inviteId]) {
      createGame({
        gameId, inviteId, id, socketId: socket.id,
      });
      Object.values(games[gameId]).forEach((el) => {
        io.sockets.sockets[el.socketId].emit('start game', true);
      });
    }
  });

  socket.on('user choice', (userId, userChoice, playerName) => {
    if (users[userId]) {
      games[gameId][userId].move = userChoice;
      choices.push({ playerName, userChoice });

      if (choices.length === 2) {
        const decision = rpsls(choices[0], choices[1]);
        choices.length = 0;
        io.emit('decision', decision);
      }
    }
  });

  socket.on('chat message', (data) => {
    Object.values(games[gameId]).forEach((el) => {
      el.messages.push(data);
      // console.log(el.socketId);
      io.sockets.sockets[el.socketId].emit('chat message', el.messages);
    });
    // games[gameId][userId].messages.push(msg);
    // console.log(games[gameId]);
    // io.emit('chat message', data);
  });
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    // delete users[id];
    console.log('User disconnected');
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
