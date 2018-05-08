import React, { Component } from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem('id'),
    };
  }
  componentWillMount() {
    const socket = io('http://localhost:4001');

    if (this.state.id === null) {
      socket.emit('user id', this.state.id);
      socket.on('user id', (userId, count) => {
        localStorage.setItem('id', userId);
        localStorage.setItem('count', count);
        this.setState({ id: userId });
      });
    }
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
        <a href={`${window.location.href}${this.state.id}`}>{`${window.location.href}invite:${this.state.id}`}</a>
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
