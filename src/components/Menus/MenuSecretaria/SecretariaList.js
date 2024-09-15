import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getAllSecretarias } from '../../../api/secretaria';
import styles from './SecretariaList.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import SecretariaCard from './SecretariaCard';
import ActionBar from '../../ActionBar/ActionBar';


function SecretariaList() {
  const [secretarias, setSecretarias] = useState([]);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // ACRESCENTADO
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6; // ACRESCENTADO

  useEffect(() => {
    const fetchSecretarias = async () => {
      try {
        const data = await getAllSecretarias();
        setSecretarias(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar secretarias:', error);
        setLoading(false);
      }
    };
    fetchSecretarias();
  }, []);

  const filteredSecretarias = secretarias.filter(secretaria =>
    secretaria.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(secretarias.length / itemsPerPage); 

  const handlePageChange = (newPage) => { 
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage; 
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

  const handleDeleteSecretaria = (id) => {
    setSecretarias(secretarias.filter(secretaria => secretaria.id !== id));
  };

  return (
    <main className={styles.secretariasModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Secretaria' link='nova-secretaria' onSearch={handleSearch}/>
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Secretarias</h2>
        <section className={styles.listSection}>
          {currentItems.map((secretaria, index) => (
            <SecretariaCard key={index} name={secretaria.nome}
              phone={secretaria.fone}
              id={secretaria.id}
              onDelete={handleDeleteSecretaria} 
              onEdit={handleEditSecretaria}

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