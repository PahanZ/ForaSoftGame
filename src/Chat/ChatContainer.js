import React from 'react';
import PropTypes from 'prop-types';

const ChatContainer = props => (
  <div className="chat_container">
    {props.messages.map((el, i) => (
      <p key={String(i)}>{el}</p>
    ))}
  </div>
);

ChatContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChatContainer;
