import React from 'react';
import styles from './MenuPrincipal.module.css';

const MenuItem = ({ text }) => {
  return (
    <button className={styles.menuItem}>
      {text}
    </button>
  );
};

export default MenuItem;