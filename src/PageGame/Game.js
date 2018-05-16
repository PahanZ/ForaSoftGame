import React, { Component } from 'react';
import io from 'socket.io-client';
import './Game.css';
import Action from '../Action/Action';
import Decision from '../Decision/Decision';
import Chat from '../Chat/Chat';

const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

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
    this.connection = io('http://localhost:4001');
    this.changeActivity = this.changeActivity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  componentDidMount() {
    this.connection.on('chat message', (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
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
    console.log(this.userId, choice, this.name);
    this.setState({ activity: !this.state.activity });
  }
  submitMessage(e) {
    e.preventDefault();
    const input = e.target.message;
    this.connection.emit('chat message', {
      id: this.userId,
      name: this.name,
      message: input.value,
      time: new Date(),
    });
    input.value = '';
  }
  render() {
    return (
      <div className="page_game">
        <h1 className="title">
          Страница игры. Вы игрок: {this.name}
        </h1>
        <Action
          submit={this.handleSubmit}
          activity={this.state.activity}
          actions={actions}
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
