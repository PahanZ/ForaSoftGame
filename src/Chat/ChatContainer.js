import React from 'react';
import PropTypes from 'prop-types';

const correctTime = (timeFromServer) => {
  const time = new Date(timeFromServer);
  const hours = (time.getHours() < 10) ? `0${time.getHours()}` : time.getHours();
  const minutes = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
  const seconds = (time.getSeconds() < 10) ? `0${time.getSeconds()}` : time.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

const ChatContainer = props => (
  <div className="chat_container">
    {props.messages.map((el, i) => (
      <div key={String(i)}>
        <p>{el.name}:</p>
        <p>{el.message}</p>
        <p>{correctTime(el.time)}</p>
      </div>
      ))}
  </div>
);

ChatContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChatContainer;
