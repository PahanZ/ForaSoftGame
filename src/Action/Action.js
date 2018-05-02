import React from "react";
import './Action.css';

export default (props) => (
  <button 
    className="action"
    disabled={props.activity}
    onClick={(e) => {
      props.submit(e)
    }}
  >
    {props.content}
  </button>
  );
