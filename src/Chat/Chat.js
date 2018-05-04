import React from 'react';
import './Chat.css';
import ChatContainer from './ChatContainer';
import Form from './Form';

export default props => (
  <section className="chat">
    <ChatContainer messages={props.messages} />
    <Form submitMessage={props.submitMessage} />
  </section>
);
