import React from 'react';
import styles from '../Novo.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';

const NovoEquipamento = () => {
    const campos = [
        {label: 'Número de Patrimônio', name: 'numPatrimonio', type: 'number'},
        {label: 'Modelo', name: 'modelo', type: 'text'},
        {label: 'Marca', name: 'marca', type: 'text'},
        {label: 'Data de aquisição', name: 'DataAquisicao', type: 'date'},
        {label: 'Descrição Técnica', name: 'Descricao', type: 'text'}
    ]

    const handleFormSubmit = (formData) => {
        console.log('Dados do formulário:', formData);
    }; 
    
  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Novo Equipamento</h1>
      <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/equipamentos"/>
      </main>
    </div>
  );
};

export default NovoEquipamento;