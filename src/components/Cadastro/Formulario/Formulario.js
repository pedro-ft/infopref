import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Formulario.module.css';

const Formulario = ({ campos, onSubmit, voltarUrl }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    navigate(voltarUrl);
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
            ) : (
              <input
                type={campo.type}
                name={campo.name}
                value={formData[campo.name] || ''}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}

        <div className={styles.formButtons}>
          <button type="button" className={styles.btnBack} onClick={handleVoltar}>
            Voltar
          </button>
          <button type="submit" className={styles.btnSubmit}>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
