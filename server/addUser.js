const { users } = require('./store');

const addUser = (userId, user) => {
  users[userId] = user;
};

module.exports = addUser;
