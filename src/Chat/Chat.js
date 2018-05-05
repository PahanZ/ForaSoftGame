import React from 'react';
import PropTypes from 'prop-types';
import './Chat.css';
import ChatContainer from './ChatContainer';
import Form from './Form';

const Chat = props => (
  <section className="chat">
    <ChatContainer messages={props.messages} />
    <Form submitMessage={props.submitMessage} />
  </section>
);

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitMessage: PropTypes.func.isRequired,
};

export default Chat;
