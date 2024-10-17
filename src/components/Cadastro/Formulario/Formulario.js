import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Formulario.module.css';

const Formulario = ({ campos, onSubmit, voltarUrl }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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

    setFormData({ ...formData, [name]: formattedValue });
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
          <button type="submit" className={styles.btnSubmit}>Salvar</button>
          <button type="button" className={styles.btnBack} onClick={handleVoltar}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
