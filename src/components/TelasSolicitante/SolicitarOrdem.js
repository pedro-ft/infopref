import React from 'react';
import styles from '../Cadastro/Novo.module.css'
import Formulario from '../Cadastro/Formulario/Formulario';
import Cabecalho from '../Cabecalho/Cabecalho';

const SolicitarOS = () => {
    const campos = [
        {label: 'Solicitante', name: 'solicitante', type: 'text'},
        {label: 'Secretaria', name: 'secretaria', type: 'select', options: ['Educação', 'Saúde', 'Segurança']},
        {label: 'Departamento', name: 'departamento', type: 'select', options: ['Educação', 'Saúde', 'Segurança']},
        {label: 'Número de Patrimônio', name: 'numPatrimonio', type: 'number'},
        {label: 'Descrição', name: 'descricao', type: 'text'}
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Solicitar OS</h1>
      <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/minhas-solicitacoes"/>
      </main>
    </div>
  );
};

export default SolicitarOS;