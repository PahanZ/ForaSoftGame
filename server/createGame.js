const { games, users } = require('./store');

const createGame = ({
  gameId, inviteId, userId,
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
    socketId: users[userId].socketId,
    messages: [],
  };
};

module.exports = createGame;
