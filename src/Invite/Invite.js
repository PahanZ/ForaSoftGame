import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUser, startGame, redirect } from '../helper';
import './invite.css';

class Invite extends React.Component {
  componentDidMount() {
    const inviteId = this.props.match.params.id.slice(1);
    addUser();
    startGame(inviteId);
    redirect().then((status) => {
      if (status === true) {
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
