import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './SecretariaList.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import SecretariaCard from './SecretariaCard';
import ActionBar from '../../ActionBar/ActionBar';

const initialSecretarias = [
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
  const [secretarias, setSecretarias] = useState(initialSecretarias);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
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

  const handleBackButtonClick = () => {
    if (username === 'Jonas de Godoi') {
      navigate('/menu2');
    } else {
      navigate('/menu');
    }
  };

  const handleEditSecretaria = (index, updatedSecretaria) => {
    const updatedSecretarias = [...secretarias];
    updatedSecretarias[index] = updatedSecretaria;
    setSecretarias(updatedSecretarias);
  };

  return (
    <main className={styles.secretariasModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Secretaria' link='nova-secretaria' onSearch={handleSearch}/>
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Secretarias</h2>
        <section className={styles.listSection}>
          {currentItems.map((secretaria, index) => (
            <SecretariaCard key={index} {...secretaria} 
            onEdit={(updatedSecretaria) => handleEditSecretaria(startIndex + index, updatedSecretaria)}
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
      <button onClick={handleBackButtonClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </main>
  );
}

export default SecretariaList;