import React, { Component } from "react";
import io from "socket.io-client";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const socket = io('http://localhost:4001');
    socket.on('start', start => {
      console.log(start);
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
export default App;