import React from 'react';
import styles from '../Novo.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import FormularioOS from './FormularioOS';

const NovaOS = () => {
  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Nova O. S.</h1>
      <FormularioOS />
      </main>
    </div>
  );
};

export default NovaOS;