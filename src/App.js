import React, { Component } from "react";
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const socket = io('http://localhost:4001');
  }
  render() {
    console.log(this)
    return (
      <div>
      </div>
    )
  }
}
export default App;