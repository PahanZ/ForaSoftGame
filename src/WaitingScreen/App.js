import React, { Component } from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   id: localStorage.getItem('id'),
  //   // };
  // }
  componentWillMount() {
    const socket = io('http://localhost:4001');
    const id = localStorage.getItem('id');

    socket.emit('start game', null, id);
    socket.on('start game', (start, params) => {
      if (params) {
        localStorage.setItem('id', params.newId);
        localStorage.setItem('name', params.name);
      }
      if (start === true) {
        this.props.history.push('/game');
      }
    });
  }
  render() {
    return (
      <div className="waiting_screen">
        <h1>Cсылка для второго игрока</h1>
        <a href={`${window.location.href}${localStorage.getItem('id')}`}>
          {`${window.location.href}invite:${localStorage.getItem('id')}`}
        </a>
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
  // match: PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.bool,
  //   PropTypes.objectOf(PropTypes.string),
  // ])).isRequired,
};

export default withRouter(App);
