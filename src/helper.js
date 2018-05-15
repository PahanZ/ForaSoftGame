import io from 'socket.io-client';

const id = sessionStorage.getItem('id');
const socket = io('http://localhost:4001', { query: { id } });

const addUser = () => {
  socket.on('user data', (data) => {
    sessionStorage.setItem('id', data.id);
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

export { addUser, startGame, redirect };
