import React from 'react';

export default props => (
  <form onSubmit={(e) => {
    props.submitMessage(e);
  }}>
    <input name="message" type="text" />
    <button>Отправить</button>
  </form>
);
