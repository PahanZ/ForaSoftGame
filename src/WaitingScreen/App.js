import React, { Component } from "react";
import io from "socket.io-client";
import './App.css';
import { Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    const socket = io('http://localhost:4001');
    socket.on('start', start => {
      if (start) {
        console.log(start);
        return <Redirect to='/game' />;
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
export default App;