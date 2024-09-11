import React, { useState } from 'react';
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
    name: "Segurança Pública",
    phone: "(42) 3231-4545",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Transportes e Trânsito",
    phone: "(42) 3231-5656",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Ambiente e Sustentabilidade",
    phone: "(42) 3231-6767",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Cultura e Lazer",
    phone: "(42) 3231-7878",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Desenvolvimento Econômico",
    phone: "(42) 3231-8989",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Assistência Social",
    phone: "(42) 3231-9090",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Planejamento Urbano",
    phone: "(42) 3231-2121",
    imageUrl: "/imagens/Secretaria.svg"
  }
];


function SecretariaList() {
  const [currentPage, setCurrentPage] = useState(1); // ACRESCENTADO
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6; // ACRESCENTADO

  const filteredSecretarias = secretarias.filter(secretaria =>
    secretaria.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(secretarias.length / itemsPerPage); // ACRESCENTADO

  const handlePageChange = (newPage) => { // ACRESCENTADO
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage; // ACRESCENTADO
  const currentItems = filteredSecretarias.slice(startIndex, startIndex + itemsPerPage); // ACRESCENTADO
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  return (
    <main className={styles.secretariasModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Secretaria' onSearch={handleSearch}/>
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Secretarias</h2>
        <section className={styles.listSection}>
          {currentItems.map((secretaria, index) => (
            <SecretariaCard key={index} {...secretaria} />
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

export default SecretariaList;