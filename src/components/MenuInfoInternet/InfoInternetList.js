import React from 'react';
import styles from './InfoInternetList.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import InfoInternetCard from './InfoInternetCard';
import ActionBar from '../ActionBar/ActionBar';
import {Link} from 'react-router-dom';

const infosInternet = [
  {
    nomeRede: "adm2024",
    senha: "pref2024adm",
    ip: "192.168.1.1",
    imageUrl: "/imagens/Internet.svg"
  },
  {
    nomeRede: "adm02",
    senha: "pref2024adm2",
    ip: "192.168.1.2",
    imageUrl: "/imagens/Internet.svg"
  }
];

function InfoInternetList() {
  return (
    <main className={styles.infoInternetModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Informação de Internet'/>
      <div className={styles.contentWrapper}>
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Lista Informações de Internet</h2>
          {infosInternet.map((infoInternet, index) => (
            <InfoInternetCard key={index} {...infoInternet} />
          ))}
        </section>
      </div>
      <Link to="/departamentos" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default InfoInternetList;