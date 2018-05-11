import React, { Component } from 'react';
import io from 'socket.io-client';
import './Game.css';
import Action from '../Action/Action';
import Decision from '../Decision/Decision';
import Chat from '../Chat/Chat';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      decision: '',
      messages: [],
    };
    this.userId = sessionStorage.getItem('id');
    this.name = sessionStorage.getItem('name');
    this.actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    this.connection = io('http://localhost:4001');
    this.changeActivity = this.changeActivity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  componentDidMount() {
    this.connection.on('chat message', (name, msg) => {
      this.setState({ messages: [...this.state.messages, { name, msg }] });
    });
  }
  componentDidUpdate() {
    this.connection.on('decision', (decision) => {
      this.setState({ decision });
    });
  }
  changeActivity() {
    this.setState({ activity: !this.state.activity });
  }
  handleSubmit(e) {
    const choice = e.target.textContent;
    this.connection.emit('user choice', this.userId, choice, this.name);
    this.setState({ activity: !this.state.activity });
  }
  submitMessage(e) {
    e.preventDefault();
    const input = e.target.message;
    this.connection.emit('chat message', this.name, input.value);
    input.value = '';
  }
  render() {
    console.log(this.state);
    return (
      <div className="page_game">
        <h1 className="title">
          Страница игры. Вы игрок: {this.name}
        </h1>
        <Action
          submit={this.handleSubmit}
          activity={this.state.activity}
          actions={this.actions}
        />
        <Decision
          content={this.state.decision}
          activity={this.changeActivity}
        />
        <Chat
          messages={this.state.messages}
          submitMessage={this.submitMessage}
        />
      </div>
    );
  }
}
