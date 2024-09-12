import React, { useState } from 'react';
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
  },
  {
    name: "Laura Fernandes",
    phone: "(42) 99807-1234",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Roberto Oliveira",
    phone: "(42) 99808-2345",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Juliana Lima",
    phone: "(42) 99809-3456",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Lucas Martins",
    phone: "(42) 99810-4567",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Ana Paula Souza",
    phone: "(42) 99811-5678",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Carlos Henrique",
    phone: "(42) 99812-6789",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Fernanda Costa",
    phone: "(42) 99813-7890",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Marcos Pereira",
    phone: "(42) 99814-8901",
    imageUrl: "/imagens/Tecnico.svg"
  },
  {
    name: "Beatriz Ribeiro",
    phone: "(42) 99815-9012",
    imageUrl: "/imagens/Tecnico.svg"
  }
];

function TecnicoList() {
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

  return (
    <main className={styles.tecnicosModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Técnico' link='novo-tecnico' onSearch={handleSearch}/>
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Técnicos</h2>
        <section className={styles.listSection}>
          {currentItems.map((tecnico, index) => (
            <TecnicoCard key={index} {...tecnico} />
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