const addUser = require('./addUser');

let count = 1;

const createUser = ({
  userId, gameId, socketId,
}) => {
  const user = {
    userId,
    playerName: `Player ${count}`,
    gameId,
    socketId,
  };
  addUser(userId, user);
  count += 1;
};

module.exports = createUser;
