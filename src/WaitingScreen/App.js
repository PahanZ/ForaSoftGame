import React, { Component } from "react";
import io from "socket.io-client";
import './App.css';
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    const socket = io('http://localhost:4001');
    socket.on('count', countUsers => {
      if (countUsers >= 2) {
        this.props.history.push('/game');
      } else {
        this.props.history.push('/');
      }
    })
  }
  render() {
    return (
      <div className="waiting_screen">
        <h1>Cсылка для второго игрока</h1>
        <a href="#">{window.location.href}</a>
      </div>
    )
  }
}
export default withRouter(App);