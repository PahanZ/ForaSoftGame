import React, { Component } from 'react';
import './Game.css';
import Action from '../Action/Action';
import Decision from '../Decision/Decision';
import Chat from '../Chat/Chat';
import { userChoice, sentMessage, socket } from '../API';
import actions from './icons';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: false,
      decision: '',
      messages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    socket.on('chat message', (data) => {
      this.setState({ messages: data });
    });
  }
  componentDidUpdate() {
    const promise = new Promise((resolve) => {
      socket.on('decision', (decision) => {
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
    const choice = e.target.alt;
    userChoice({
      choice,
    });
    this.setState({ activity: !this.state.activity });
  }
  render() {
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
          submitMessage={(e) => {
            sentMessage(e);
          }}
        />
      </div>
    );
  }
}
