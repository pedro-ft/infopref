import React from 'react';
import styles from './SolicitanteList.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import SolicitanteCard from './SolicitanteCard';
import ActionBar from '../ActionBar/ActionBar';
import {Link} from 'react-router-dom';

const solicitantes = [
  {
    name: "Pedro Ferreira Taborda",
    department: "Administração",
    secretariat: "Administração",
    phone: "(42) 99806-7951",
    remoteAccessId: "565 789 786",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Leonardo Mulinari",
    department: "Educação e Cultura",
    secretariat: "Educação e Cultura",
    phone: "(42) 99923-8965",
    remoteAccessId: "321 654 543",
    imageUrl: "/imagens/Usuario.svg"
  },
  {
    name: "Jonas de Godoi",
    department: "Saúde",
    secretariat: "Saúde",
    phone: "(42) 99134-6751",
    remoteAccessId: "562 955 654",
    imageUrl: "/imagens/Usuario.svg"
  }
];

function SolicitanteList() {
  return (
    <main className={styles.solicitanteModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Solicitante'/>
      <div className={styles.contentWrapper}>
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Lista Solicitantes</h2>
          {solicitantes.map((solicitante, index) => (
            <SolicitanteCard key={index} {...solicitante} />
          ))}
        </section>
      </div>
      <Link to="/menu" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default SolicitanteList;