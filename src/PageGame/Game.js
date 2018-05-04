import React, { Component } from "react";
import io from "socket.io-client";
import './Game.css';
import Action from '../Action/Action';
import Decision from '../Decision/Decision';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNumber: '',
      activity: false,
      decision: ''
    }
    this.actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    this.connection = io('http://localhost:4001');
  }
  componentDidMount() {
    this.connection.on('count', countUsers => {
      this.setState({ userNumber: countUsers})
      console.log(countUsers);
    })
  }
  componentDidUpdate() {
    this.connection.on('decision', decision => {
      this.setState({decision})
    })
  }
  changeActivity = () => {
    this.setState({ activity: !this.state.activity })
  }
  handleSubmit = (e) => {
    const choice = e.target.textContent;
    this.connection.emit('user choice', choice);
    this.setState({activity: !this.state.activity})    
  }
  render() {
    return (
      <div className="page_game">
        <h1 className="title">Страница игры. Вы игрок {this.state.userNumber}</h1> 
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
        <section className="decision">
          <Decision 
            content={this.state.decision} 
            activity={this.changeActivity}
            />
        </section>         
      </div>
    )
  }
}
export default Game;