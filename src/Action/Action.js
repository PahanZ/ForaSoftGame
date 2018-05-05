import React from 'react';
import PropTypes from 'prop-types';
import './Action.css';

const Action = props => (
  <section className="actions">
    {
    props.actions.map((el, i) => (
      <button
        key={String(i)}
        className="action"
        disabled={props.activity}
        onClick={(e) => {
          props.submit(e);
        }}
      >
        {el}
      </button>
    ))
  }
  </section>
);

Action.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  activity: PropTypes.bool.isRequired,
};

export default Action;
