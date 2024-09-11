import React,  { useState } from 'react';
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
  },
  {
    nomeRede: "adm2024",
    senha: "pref2024adm",
    ip: "192.168.1.1",
    imageUrl: "/imagens/Internet.svg"
  },
  {
    nomeRede: "adm2024",
    senha: "pref2024adm",
    ip: "192.168.1.1",
    imageUrl: "/imagens/Internet.svg"
  },
  {
    nomeRede: "adm2024",
    senha: "pref2024adm",
    ip: "192.168.1.1",
    imageUrl: "/imagens/Internet.svg"
  },
  {
    nomeRede: "adm2024",
    senha: "pref2024adm",
    ip: "192.168.1.1",
    imageUrl: "/imagens/Internet.svg"
  },
  {
    nomeRede: "adm2024",
    senha: "pref2024adm",
    ip: "192.168.1.1",
    imageUrl: "/imagens/Internet.svg"
  },
];

function InfoInternetList() {
  const [currentPage, setCurrentPage] = useState(1); // ACRESCENTADO
  const itemsPerPage = 6; // ACRESCENTADO

  const totalPages = Math.ceil(infosInternet.length / itemsPerPage); // ACRESCENTADO

  const handlePageChange = (newPage) => { // ACRESCENTADO
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage; // ACRESCENTADO
  const currentItems = infosInternet.slice(startIndex, startIndex + itemsPerPage); // ACRESCENTADO

  return (
    <main className={styles.infoInternetModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Informação de Internet'/>
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Informações de Internet</h2>
        <section className={styles.listSection}>
          {currentItems.map((infoInternet, index) => (
            <InfoInternetCard key={index} {...infoInternet} />
          ))}
        </section>
      </div>
      <div className={styles.pagination}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
      <Link to="/departamentos" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default InfoInternetList;