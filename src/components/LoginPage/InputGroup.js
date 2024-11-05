import React, { useState } from "react";
import styles from './LoginPage.module.css';

function InputGroup({ label, iconSrc, iconAlt, value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = `${label.toLowerCase()}Input`;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label htmlFor={inputId} className={styles['visually-hidden']}>{label}</label>
          <input
            type={label === "Senha" ? (isPasswordVisible ? "text" : "password") : "text"}
            id={inputId}
            className={styles.loginLabel}
            placeholder={label}
            aria-label={label}
            value={value}
            onChange={onChange}
          />
        </div>
        {label === "Senha" ? (
          <img
            loading="lazy"
            src={isPasswordVisible ? "imagens/iconeOculto.svg" : iconSrc} 
            alt={isPasswordVisible ? "Ocultar senha" : iconAlt}
            className={styles.inputIcon}
            onClick={togglePasswordVisibility} 
            style={{ cursor: "pointer" }}
          />
        ) : (
          <img loading="lazy" src={iconSrc} alt={iconAlt} className={styles.inputIcon} />
        )}
      </div>
      <div className={styles.inputDivider} />
    </>
  );
}

export default InputGroup;
