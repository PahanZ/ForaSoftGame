import React from 'react';

export default props => {
  console.log(props.messages);
  return (
  <div className="chat_container">
    {props.messages.map((el, i) => (
      <p key={String(i)}>{el}</p>
    ))}
  </div>
)};
