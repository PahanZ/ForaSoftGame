import React, { Component } from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  componentDidMount() {
    const socket = io('http://localhost:4001');
    socket.on('count', (countUsers) => {
      if (countUsers >= 2) {
        this.props.history.push('/game');
      } else {
        this.props.history.push('/');
      }
    });
  }
  render() {
    console.log(this.props.history);
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
