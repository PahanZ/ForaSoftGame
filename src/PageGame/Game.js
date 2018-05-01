import React, { Component } from "react";
import io from "socket.io-client";
// import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Страница игры</h1>            
      </div>
    )
  }
}
export default Game;