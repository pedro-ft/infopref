import React from 'react';
import styles from '../Novo.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';

const NovoTecnico = () => {
    const campos = [
        {label: 'Nome', name: 'nome', type: 'text'},
        {label: 'Fone', name: 'fone', type: 'text'},
        {label: 'Usuário', name: 'usuario', type: 'text'},
        {label: 'Senha', name: 'senha', type: 'text'},
        {label: 'Técnico Administrador', name: 'TecAdm', type: 'checkbox'},
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 
    
  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Novo Tecnico</h1>
      <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/tecnicos"/>
      </main>
    </div>
  );
};

export default NovoTecnico;