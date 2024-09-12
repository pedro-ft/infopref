import React from 'react';
import styles from '../Novo.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';

const NovoSolicitante = () => {
    const campos = [
        {label: 'Nome', name: 'nome', type: 'text'},
        {label: 'Secretaria', name: 'secretaria', type: 'text'},
        {label: 'Departamento', name: 'departamento', type: 'text'},
        {label: 'Fone', name: 'fone', type: 'text'},
        {label: 'ID de Acesso Remoto', name: 'idAcesso', type: 'number'},
        {label: 'Usuário', name: 'usuario', type: 'text'},
        {label: 'Senha', name: 'senha', type: 'text'}
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 
    
  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Novo Solicitante</h1>
      <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/solicitantes"/>
      </main>
    </div>
  );
};

export default NovoSolicitante;