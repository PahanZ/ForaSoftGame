const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uniqueString = require('unique-string');
const rpsls = require('./rpsls');
const { users, games } = require('./store');
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
  } else {
    users[userId].socketId = socket.id;
  }

  socket.on('start game', (inviteId) => {
    if (users[inviteId]) {
      createGame({
        gameId, inviteId, userId,
      });
      Object.values(games[gameId]).forEach((el) => {
        io.sockets.sockets[el.socketId].emit('start game', true);
      });
    }
  });

  socket.on('user choice', (data) => {
    // users[data.userId].socketId = socket.id; // если раскоментить строку, то всё гуд
    if (users[data.userId]) {
      games[gameId][data.userId].move = data.choice;
      games[gameId][data.userId].playerName = data.name;
      const gamesData = Object.values(games[gameId]);
      const finalChoice = gamesData.every(el => el.move !== '');
      if (finalChoice) {
        const decision = rpsls(
          gamesData[0],
          gamesData[1],
        );
        Object.values(users).forEach((el) => {
          if (gamesData[0].id === el.userId ||
              gamesData[1].id === el.userId) {
            console.log('socket id ', socket.id); // текущий сокет айди(отличается от записанного в юзерс)
            console.log('element socket id ', el.socketId); // сокет айди, записанный в юзерс
            io.sockets.sockets[el.socketId].emit('decision', decision);
            games[gameId][el.userId].move = '';
          }
        });
      }
    }
  });

  socket.on('chat message', (data) => {
    console.log('users ', users);
    console.log('games ', games);
    games[gameId][data.userId].socketId = socket.id;
    Object.values(games[gameId]).forEach((el) => {
      el.messages.push(data);
      // console.log('socket id', socket.id);
      // console.log('el socketId', el.socketId);
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
