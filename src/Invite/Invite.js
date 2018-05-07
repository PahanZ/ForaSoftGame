import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import './invite.css';

class Invite extends React.Component {
  componentDidMount() {
    const socket = io('http://localhost:4001');
    const inviteId = this.props.match.params.id.slice(1);
    const id = localStorage.getItem('id');
    socket.emit('start game', inviteId, id);
    socket.on('start game', (start) => {
      if (start === true) {
        this.props.history.push('/game');
      }
    });
  }
  render() {
    return (
      <div className="waiting_screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }
}

Invite.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.objectOf(PropTypes.string),
  ])).isRequired,
  match: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.objectOf(PropTypes.string),
  ])).isRequired,
};

export default withRouter(Invite);
