const { users } = require('./store');

const addUser = (id, user) => {
  users[id] = user;
};

module.exports = addUser;
