import React from 'react';
import PropTypes from 'prop-types';
import './Decision.css';

export default class Decision extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content && this.props.content !== '') {
      this.props.activity();
    }
  }
  render() {
    return (
      <section className="decision">
        <h3>
          {this.props.content}
        </h3>
      </section>
    );
  }
}

Decision.propTypes = {
  activity: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};
