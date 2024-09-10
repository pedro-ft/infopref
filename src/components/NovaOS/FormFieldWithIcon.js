import React from 'react';
import styles from './NovaOS.module.css';

const FormField = ({ label }) => {
  return (
    <div className={styles.formField}>
      <label className={styles['visually-hidden']}>{label}</label>
      <span>{label}</span>
    </div>
  );
};

export default FormField;