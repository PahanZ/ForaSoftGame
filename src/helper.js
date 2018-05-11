import React from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';

export default (inviteId = null) => {
  const socket = io('http://localhost:4001');
  const id = sessionStorage.getItem('id');
  socket.emit('start game', inviteId, id);
  socket.on('start game', (start, params) => {
    if (params) {
      sessionStorage.setItem('id', params.newId);
      sessionStorage.setItem('name', params.name);
    }
    if (start === true) {
      <Redirect to="/game" />;
    //   this.props.history.push('/game');
    }
  });
};
