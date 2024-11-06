import React from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovaSecretaria = () => {
  const campos = [
    { label: '*Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    await api.post('/secretarias', formData);
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Nova Secretaria</h1>
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/secretarias" />
      </main>
    </div>
  );
};

export default NovaSecretaria;