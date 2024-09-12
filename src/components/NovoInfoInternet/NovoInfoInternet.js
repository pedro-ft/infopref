import React from 'react';
import styles from '../Novo.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';

const NovaInfoInternet = () => {
    const campos = [
        {label: 'Nome da Rede', name: 'nomeRede', type: 'text'},
        {label: 'Senha', name: 'senha', type: 'text'},
        {label: 'IP', name: 'ip', type: 'text'}
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 
    
  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Nova Informação de Internet</h1>
      <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/infoInternet"/>
      </main>
    </div>
  );
};

export default NovaInfoInternet;