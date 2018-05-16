import React from 'react';
import PropTypes from 'prop-types';
import './Decision.css';

const Decision = props => (
  <section className="decision">
    <h3>{props.content}</h3>
  </section>
);

Decision.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Decision;

