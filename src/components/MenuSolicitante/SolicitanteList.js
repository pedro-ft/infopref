import React from 'react';
import styles from './SolicitanteList.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import SolicitanteCard from './SolicitanteCard';

const solicitantes = [
  {
    name: "Pedro Ferreira Taborda",
    department: "Administração",
    secretariat: "Administração",
    phone: "(42) 99806-7951",
    remoteAccessId: "565 789 786",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/033f042af73a06a4e036ee0203d176554073feaba08f04b4e0d5bdc9fe492a90?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8"
  },
  {
    name: "Leonardo Mulinari",
    department: "Educação e Cultura",
    secretariat: "Educação e Cultura",
    phone: "(42) 99923-8965",
    remoteAccessId: "321 654 543",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/033f042af73a06a4e036ee0203d176554073feaba08f04b4e0d5bdc9fe492a90?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8"
  },
  {
    name: "Jonas de Godoi",
    department: "Saúde",
    secretariat: "Saúde",
    phone: "(42) 99134-6751",
    remoteAccessId: "562 955 654",
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/033f042af73a06a4e036ee0203d176554073feaba08f04b4e0d5bdc9fe492a90?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8"
  }
];

function SolicitanteList() {
  return (
    <main className={styles.solicitanteModule}>
      <Cabecalho />
      <div className={styles.contentWrapper}>
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Lista Solicitantes</h2>
          {solicitantes.map((solicitante, index) => (
            <SolicitanteCard key={index} {...solicitante} />
          ))}
        </section>
      </div>
      <button className={styles.backButton}>Voltar</button>
    </main>
  );
}

export default SolicitanteList;