import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Formulario.module.css';

const Formulario = ({ campos, onSubmit, voltarUrl, mostrarRequisitosSenha, errorMessage }) => {
  const [formData, setFormData] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [ipError, setIpError] = useState(null);
  const navigate = useNavigate();

  // Função para validar o IP
  const isValidIP = (ip) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/;
    return ipPattern.test(ip);
  };

  const formatPhoneNumber = (value) => {
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length <= 10) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d)/, '($1) $2');
      formattedValue = formattedValue.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    } else {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }

    return formattedValue;
  };

  const formatRemoteId = (value) => {
    let formattedValue = value.replace(/\D/g, '');

    formattedValue = formattedValue.slice(0, 9);
    formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');

    return formattedValue;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === 'fone') {
      formattedValue = formatPhoneNumber(value);
    } else if (name === 'id_acesso_remoto') {
      formattedValue = formatRemoteId(value);
    }

    if (name === 'ip') {
      if (isValidIP(value)) {
        setIpError(null);
      } else {
        setIpError('Por favor, insira um IP válido. Exemplo: 192.168.0.1');
      }
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(formData);
    if (!result || !result.error) {
      navigate(voltarUrl);
    }
  };


  const handleVoltar = () => {
    navigate(voltarUrl);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {campos.map((campo, index) => (
          <div className={styles.formGroup} key={index}>
            <label>{campo.label}:</label>
            {campo.type === 'select' ? (
              <select
                name={campo.name}
                value={formData[campo.name] || ''}
                onChange={handleInputChange}
              >
                <option value="">Selecione</option>
                {campo.options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : campo.type === 'password' ? (
              <div className={styles.inputContainer}>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name={campo.name}
                  value={formData[campo.name] || ''}
                  onChange={handleInputChange}
                />
                <img
                  src={isPasswordVisible ? "imagens/iconeOculto.svg" : "imagens/iconeVisualizar.svg"}
                  alt={isPasswordVisible ? "Ocultar senha" : "Exibir senha"}
                  className={styles.inputIcon}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ) : (
              <div className={styles.inputContainer}>
                <input
                  type={campo.type}
                  name={campo.name}
                  value={formData[campo.name] || ''}
                  onChange={handleInputChange}
                />
                {campo.name === 'ip' && ipError && (
                  <p className={styles.errorText}>{ipError}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {mostrarRequisitosSenha && (
          <p className={styles.passwordRequirements}>
            A senha deve ter entre 5 e 20 caracteres, incluindo pelo menos uma letra e um número.
          </p>
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <p className="form-note">* Campos obrigatórios</p>
        <div className={styles.formButtons}>
          <button type="button" className={styles.btnBack} onClick={handleVoltar}>Voltar</button>
          <button type="submit" className={styles.btnSubmit}>Salvar</button>
        </div>

      </form>
    </div>
  );
};

export default Formulario;
