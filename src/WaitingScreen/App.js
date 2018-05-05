import React, { Component } from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  componentDidMount() {
    const socket = io('http://localhost:4001');

    const id = localStorage.getItem('id');
    socket.emit('user id', id);
    socket.on('user id', (userId) => {
      localStorage.setItem('id', userId);
    });

    socket.emit('start game');
    socket.on('start game', (start) => {
      if (start === true) {
        this.props.history.push('/game');
      }
    });
  }
  render() {
    return (
      <div className="waiting_screen">
        <h1>Cсылка для второго игрока</h1>
        <p>{window.location.href}</p>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.objectOf(PropTypes.string),
  ])).isRequired,
};

export default withRouter(App);
