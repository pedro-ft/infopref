import React from 'react';
import styles from '../Novo.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';

const NovoDepartamento = () => {
    const campos = [
        {label: 'Nome', name: 'nome', type: 'text'},
        {label: 'Fone', name: 'fone', type: 'text'}
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 
    
  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Novo Departamento</h1>
      <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/departamentos"/>
      </main>
    </div>
  );
};

export default NovoDepartamento;