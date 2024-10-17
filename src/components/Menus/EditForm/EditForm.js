import React, { useState } from 'react';
import styles from './EditForm.module.css';

function EditForm({ fields, onSubmit, onCancel, initialValues }) {
  const [formData, setFormData] = useState(initialValues || {});

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === 'fone') {
      newValue = formatPhoneNumber(value);
    }else if (name === 'id_acesso_remoto') {
      newValue = formatRemoteId(value);
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados no formulário:', formData);
    onSubmit(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Editar</h2>
          {fields.map((field, index) => (
            <div key={index} className={styles.formGroup}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <div className={styles.formButtons}>
            <button type="submit" className={styles.btnSubmit}>
              Salvar
            </button>
            <button type="button" className={styles.btnBack} onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
