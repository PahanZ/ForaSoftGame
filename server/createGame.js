const { games, users } = require('./store');

const createGame = ({
  gameId, inviteId, userId, socketId,
}) => {
  games[gameId] = {};
  games[gameId][inviteId] = {
    id: inviteId,
    move: '',
    socketId: users[inviteId].socketId,
    messages: [],
  };
  games[gameId][userId] = {
    id: userId,
    move: '',
    socketId,
    messages: [],
  };
};

module.exports = createGame;
