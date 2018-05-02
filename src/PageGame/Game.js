import React, { Component } from "react";
import io from "socket.io-client";
import './Game.css';
import Action from '../Action/Action';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false
    }
    this.actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  }
  handleSubmit = (e) => {
    console.log(e.target);
    const choice = e.target.textContent;
    const socket = io('http://localhost:4001');
    socket.emit('user choice', choice);
    this.setState({activity: !this.state.activity})
  }
  render() {
    return (
      <div className="page_game">
        <h1 className="title">Страница игры</h1> 
        <section className="actions">
          {this.actions.map((el, i) => (
            <Action
              key={String(i)}
              content={el}
              submit={this.handleSubmit}
              activity={this.state.activity}
            />
          ))}
        </section>           
      </div>
    )
  }
}
export default Game;