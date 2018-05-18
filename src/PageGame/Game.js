import React, { Component } from 'react';
import io from 'socket.io-client';
import './Game.css';
import Action from '../Action/Action';
import Decision from '../Decision/Decision';
import Chat from '../Chat/Chat';
import { userChoice, submitMessage } from '../API';

const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      decision: '',
      messages: [],
    };
    this.connection = io('http://localhost:4001');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  componentDidMount() {
    this.connection.on('chat message', (data) => {
      this.setState({ messages: data });
    });
  }
  componentDidUpdate() {
    const promise = new Promise((resolve) => {
      this.connection.on('decision', (decision) => {
        console.log(decision);
        this.setState({ decision });
        resolve();
      });
    });
    promise.then(() => {
      setTimeout(() => {
        this.setState({ decision: '', activity: false });
      }, 3000);
    });
  }
  handleSubmit(e) {
    const choice = e.target.textContent;
    userChoice({
      connection: this.connection,
      choice,
    });
    this.setState({ activity: !this.state.activity });
  }
  submitMessage(e) {
    e.preventDefault();
    const input = e.target.message;
    submitMessage({
      connection: this.connection,
      message: input.value,
      time: new Date(),
    });
    input.value = '';
  }
  render() {
    console.log(this.state);
    return (
      <div className="page_game">
        <h1 className="title">
          Страница игры. Вы игрок: {sessionStorage.getItem('name')}
        </h1>
        <Action
          submit={this.handleSubmit}
          activity={this.state.activity}
          actions={actions}
        />
        <Decision
          content={this.state.decision}
        />
        <Chat
          messages={this.state.messages}
          submitMessage={this.submitMessage}
        />
      </div>
    );
  }
}
