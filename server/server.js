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

  let { userId } = socket.handshake.query;

  if (users[userId] === undefined) {
    userId = uniqueString();
    createUser({ userId, gameId, socketId: socket.id });
    socket.emit('user data', { userId, name: users[userId].playerName });
  }
  socket.on('start game', (inviteId) => {
    if (users[inviteId]) {
      createGame({
        gameId, inviteId, userId, socketId: socket.id,
      });
      Object.values(games[gameId]).forEach((el) => {
        io.sockets.sockets[el.socketId].emit('start game', true);
      });
    }
  });

  socket.on('user choice', (data) => {
    if (users[data.userId]) {
      games[gameId][data.userId].move = data.choice;
      choices.push({ playerName: data.name, userChoice: data.choice });

      if (choices.length === 2) {
        const decision = rpsls(choices[0], choices[1]);
        choices.length = 0;
        io.emit('decision', decision);
      }
    }
  });

  socket.on('chat message', (data) => {
    console.log(games[gameId]);
    Object.values(games[gameId]).forEach((el) => {
      el.messages.push(data);
      console.log('socket id', socket.id);
      console.log('el socketId', el.socketId);
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
