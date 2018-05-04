import React from "react";
import './Action.css';

export default (props) => (
  <section className="actions">
  {
    props.actions.map((el, i) => (
      <button
        key={String(i)}
        className="action"
        disabled={props.activity}
        onClick={(e) => {
          props.submit(e)
        }}
      >
        {el}
      </button>
    ))
  }    
  </section>  
);
