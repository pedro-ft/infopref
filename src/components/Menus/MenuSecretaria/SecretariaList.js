import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSecretarias } from '../../../api/secretaria';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import { UserContext } from '../../context/UserContext';
import SecretariaCard from './SecretariaCard';
import styles from './SecretariaList.module.css';


function SecretariaList() {
  const [secretarias, setSecretarias] = useState([]);
  const { userProfile } = useContext(UserContext);
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

  const totalPages = Math.ceil(filteredSecretarias.length / itemsPerPage);

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

  const handleEditSecretaria = (updatedSecretaria) => {
    const updatedSecretarias = secretarias.map(secretaria =>
      secretaria.id === updatedSecretaria.id ? updatedSecretaria : secretaria
    );
    setSecretarias(updatedSecretarias);
  };


  const handleDeleteSecretaria = (id) => {
    setSecretarias(secretarias.filter(secretaria => secretaria.id !== id));
  };

  return (
    <main className={styles.secretariasModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Secretaria' link='nova-secretaria' onSearch={handleSearch} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Secretarias</h2>
        <section className={styles.listSection}>
          {currentItems.map((secretaria, index) => (
            <SecretariaCard key={index} nome={secretaria.nome}
              fone={secretaria.fone}
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
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </main>
  );
}

export default SecretariaList;