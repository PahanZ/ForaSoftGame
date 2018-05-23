import io from 'socket.io-client';

const socket = io('http://localhost:4001', {
  query: {
    userId: sessionStorage.getItem('id'),
  },
});

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

const userChoice = ({ choice }) => {
  socket.emit('user choice', {
    userId: sessionStorage.getItem('id'),
    choice,
    name: sessionStorage.getItem('name'),
  });
};

const sentMessage = (e) => {
  e.preventDefault();
  const input = e.target.message;
  socket.emit('chat message', {
    userId: sessionStorage.getItem('id'),
    name: sessionStorage.getItem('name'),
    message: input.value,
    time: new Date(),
  });
  input.value = '';
};

export { addUser, startGame, redirect, userChoice, sentMessage, socket };
