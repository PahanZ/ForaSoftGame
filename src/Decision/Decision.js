import React from 'react';
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
    )
  }
} 