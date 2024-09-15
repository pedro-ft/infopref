import React, { useState } from 'react';
import styles from './EditForm.module.css'

function EditForm({ fields, onSubmit, onCancel, initialValues }) {
  const [formData, setFormData] = useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
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
