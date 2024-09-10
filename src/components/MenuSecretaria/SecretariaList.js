import React from 'react';
import styles from './SecretariaList.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import SecretariaCard from './SecretariaCard';
import ActionBar from '../ActionBar/ActionBar';
import {Link} from 'react-router-dom';

const secretarias = [
  {
    name: "Educação e Saúde",
    phone: "(42) 3231-3434",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Segurança",
    phone: "(42) 3231-7433",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Educação",
    phone: "(42) 3231-3234",
    imageUrl: "/imagens/Secretaria.svg"
  }
];

function SecretariaList() {
  return (
    <main className={styles.secretariasModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Secretaria'/>
      <div className={styles.contentWrapper}>
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Lista Secretarias</h2>
          {secretarias.map((secretaria, index) => (
            <SecretariaCard key={index} {...secretaria} />
          ))}
        </section>
      </div>
      <Link to="/menu" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default SecretariaList;