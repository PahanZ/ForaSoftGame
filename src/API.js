import io from 'socket.io-client';

const userId = sessionStorage.getItem('id');
const socket = io('http://localhost:4001', { query: { userId } });

const addUser = () => {
  socket.on('user data', (data) => {
    sessionStorage.setItem('id', data.userId);
    sessionStorage.setItem('name', data.name);
  });
};

const startGame = (inviteId = null) => {
  socket.emit('start game', inviteId);
};

const redirect = () => (
  new Promise((resolve) => {
    socket.on('start game', (start) => {
      resolve(start);
    });
  })
);

const userChoice = ({
  connection, choice,
}) => {
  connection.emit('user choice', {
    userId: sessionStorage.getItem('id'),
    choice,
    name: sessionStorage.getItem('name'),
  });
};


const submitMessage = ({
  connection, message, time,
}) => {
  connection.emit('chat message', {
    userId: sessionStorage.getItem('id'),
    name: sessionStorage.getItem('name'),
    message,
    time,
  });
};

export { addUser, startGame, redirect, userChoice, submitMessage };
