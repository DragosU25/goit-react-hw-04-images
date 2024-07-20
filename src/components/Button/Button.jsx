import React from 'react';
import styles from './Button.module.css';

function Button({ onClick, text, type }) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
