import React from 'react';
import classes from './Button.module.css';

const styles = classes.button;

function Button(props) {
  return (
    <button
      type={props.type}
      className={`${styles} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

function SelectButton(props) {
  return (
    <select className={`${styles} ${props.className}`} onChange={props.onChange}>{props.children}</select>
  );
}

export { SelectButton };
export default Button;
