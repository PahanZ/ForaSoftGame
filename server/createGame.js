const { games, users } = require('./store');

const createGame = ({
  gameId, inviteId, id, socketId,
}) => {
  games[gameId] = {};
  games[gameId][inviteId] = {
    id: inviteId,
    move: '',
    socketId: users[inviteId].socketId,
    messages: [],
  };
  games[gameId][id] = {
    id,
    move: '',
    socketId,
    messages: [],
  };
};

module.exports = createGame;
