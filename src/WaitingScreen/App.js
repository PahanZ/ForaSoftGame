import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUser, redirect } from '../API';
import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     id: sessionStorage.getItem('id'),
  //   };
  // }
  componentDidMount() {
    addUser();
    redirect().then((status) => {
      if (status === true) {
        this.props.history.push('/game');
      }
    });
  }
  render() {
    return (
      <div className="waiting_screen">
        <h1>Cсылка для второго игрока</h1>
        <a href={`${window.location.href}${sessionStorage.getItem('id')}`}>
          {`${window.location.href}invite:${sessionStorage.getItem('id')}`}
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
};

export default withRouter(App);
