import React from "react";
import styles from './LoginPage.module.css';

function InputGroup({ label, iconSrc, iconAlt, value, onChange }) {
  const inputId = `${label.toLowerCase()}Input`;

  return (
    <>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label htmlFor={inputId} className={styles['visually-hidden']}>{label}</label>
          <input
            type={label === "Senha" ? "password" : "text"}
            id={inputId}
            className={styles.inputLabel}
            placeholder={label}
            aria-label={label}
            value={value}  // Adicionando o valor do input
            onChange={onChange}  // Manipulador de mudança
          />
        </div>
        <img loading="lazy" src={iconSrc} alt={iconAlt} className={styles.inputIcon} />
      </div>
      <div className={styles.inputDivider} />
    </>
  );
}

export default InputGroup;
