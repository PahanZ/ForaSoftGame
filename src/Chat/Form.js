import React from 'react';
import PropTypes from 'prop-types';

const Form = props => (
  <form onSubmit={(e) => {
    props.submitMessage(e);
  }}
  >
    <input name="message" type="text" />
    <button>Отправить</button>
  </form>
);

Form.propTypes = {
  submitMessage: PropTypes.func.isRequired,
};

export default Form;
