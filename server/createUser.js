const addUser = require('./addUser');

let count = 1;

const createUser = ({
  id, gameId, socketId,
}) => {
  const user = {
    id,
    playerName: `Player ${count}`,
    gameId,
    socketId,
  };
  addUser(id, user);
  count += 1;
};

module.exports = createUser;
