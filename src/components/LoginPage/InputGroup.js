import React, { useState } from "react";
import styles from './LoginPage.module.css';

function InputGroup({ label, iconSrc, iconAlt, value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar visibilidade da senha
  const inputId = `${label.toLowerCase()}Input`;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Alterna entre mostrar e esconder senha
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
            src={isPasswordVisible ? "imagens/iconeOculto.svg" : iconSrc}  // Alterna ícone de exibir/ocultar
            alt={isPasswordVisible ? "Ocultar senha" : iconAlt}
            className={styles.inputIcon}
            onClick={togglePasswordVisibility}  // Manipulador de clique para alternar visibilidade
            style={{ cursor: "pointer" }}  // Ícone clicável
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
