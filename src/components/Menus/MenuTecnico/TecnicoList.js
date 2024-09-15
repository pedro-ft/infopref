import React, { useState } from 'react';
import styles from './TecnicoList.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import TecnicoCard from './TecnicoCard';
import ActionBar from '../../ActionBar/ActionBar';
import {Link} from 'react-router-dom';

const initialTecnicos = [
  {
    name: "Pedro Ferreira Taborda",
    phone: "(42) 99806-7951",
  },
  {
    name: "Leonardo Mulinari",
    phone: "(42) 99923-8965",
  },
  {
    name: "Leonardo Mulinari",
    phone: "(42) 99923-8965",
  },
  {
    name: "Leonardo Mulinari",
    phone: "(42) 99923-8965",
  },
  {
    name: "Leonardo Mulinari",
    phone: "(42) 99923-8965",
  },
  {
    name: "Leonardo Mulinari",
    phone: "(42) 99923-8965",
  },
  {
    name: "Leonardo Mulinari",
    phone: "(42) 99923-8965",
  },
];

function TecnicoList() {
  const [tecnicos, setTecnicos] = useState(initialTecnicos);
  const [currentPage, setCurrentPage] = useState(1); // ACRESCENTADO
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6; // ACRESCENTADO

  const filteredTecnicos = tecnicos.filter(tecnico =>
    tecnico.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(tecnicos.length / itemsPerPage); // ACRESCENTADO

  const handlePageChange = (newPage) => { // ACRESCENTADO
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage; // ACRESCENTADO
  const currentItems = filteredTecnicos.slice(startIndex, startIndex + itemsPerPage); // ACRESCENTADO

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  const handleEditTecnico = (index, updatedTecnico) => {
    const updatedTecnicos = [...tecnicos];
    updatedTecnicos[index] = updatedTecnico;
    setTecnicos(updatedTecnicos);
  };

  return (
    <main className={styles.tecnicosModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Técnico' link='novo-tecnico' onSearch={handleSearch}/>
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Técnicos</h2>
        <section className={styles.listSection}>
          {currentItems.map((tecnico, index) => (
            <TecnicoCard key={index} {...tecnico}
            onEdit={(updatedTecnico) => handleEditTecnico(startIndex + index, updatedTecnico)}
            />
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
      <Link to="/menu" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default TecnicoList;