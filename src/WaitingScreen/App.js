import React, { Component } from "react";
import io from "socket.io-client";
import './App.css';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    // console.log(this.props.history());
    const socket = io('http://localhost:4001');
    socket.on('count', countUsers => {
      if (countUsers === 2) {
        this.props.history.push('/game');
      }    
    })
    return (
      <div className="waiting_screen">
        <h1>Cсылка для второго игрока</h1>
        <a href="#">{window.location.href}</a>
      </div>
    )
  }
}
export default withRouter(App);