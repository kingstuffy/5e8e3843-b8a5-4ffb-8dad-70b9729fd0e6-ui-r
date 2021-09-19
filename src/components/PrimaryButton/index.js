import React from 'react';
import styles from './index.module.css'

const PrimaryButton = ({ children, ...rest }) => (
  <button className={ styles.button } { ...rest }>
    { children }
  </button>
)

export default PrimaryButton;
