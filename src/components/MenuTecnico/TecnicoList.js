import React from 'react';
import styles from './TecnicoList.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import TecnicoCard from './TecnicoCard';
import ActionBar from '../ActionBar/ActionBar';
import {Link} from 'react-router-dom';

const tecnicos = [
  {
    name: "Pedro Ferreira Taborda",
    phone: "(42) 99806-7951",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Leonardo Mulinari",
    phone: "(42) 99923-8965",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Jonas de Godoi",
    phone: "(43) 99143-3454",
    imageUrl: "/imagens/Tecnico.svg"
  }
];

function TecnicoList() {
  return (
    <main className={styles.tecnicosModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Técnico'/>
      <div className={styles.contentWrapper}>
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Lista Técnicos</h2>
          {tecnicos.map((tecnico, index) => (
            <TecnicoCard key={index} {...tecnico} />
          ))}
        </section>
      </div>
      <Link to="/menu" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default TecnicoList;