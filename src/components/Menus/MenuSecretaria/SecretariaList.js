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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Ordem Alfabética');
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchSecretarias = async () => {
      try {
        const data = await getAllSecretarias();
        setSecretarias(data);
      } catch (error) {
        console.error('Erro ao carregar secretarias:', error);
      }
    };
    fetchSecretarias();
  }, []);

  const filteredSecretarias = secretarias
    .filter(secretaria =>
      secretaria.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortType) {
        case 'Mais recente':
          return b.id - a.id;
        case 'Mais antigo':
          return a.id - b.id;
        case 'Ordem alfabética':
        default:
          return a.nome.localeCompare(b.nome);
      }
    });

  const totalPages = Math.ceil(filteredSecretarias.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredSecretarias.slice(startIndex, startIndex + itemsPerPage);

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

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleDeleteSecretaria = (id) => {
    setSecretarias(secretarias.filter(secretaria => secretaria.id !== id));
  };

  const handleBackClick = () => {
    if (userProfile === 'ADM') {
      navigate('/menu');
    } else if (userProfile === 'TECNICO') {
      navigate('/menu2');
    }
  };

  return (
    <main className={styles.secretariasModule}>
      <Cabecalho />
      <ActionBar tipo='Nova Secretaria'
        link='nova-secretaria'
        onSearch={handleSearch}
        onSort={handleSort}
        sortOptions={['Ordem alfabética', 'Mais recente', 'Mais antigo']} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Secretarias</h2>
        <section className={styles.listSection}>
          {currentItems.length > 0 ? (
            currentItems.map((secretaria, index) => (
              <SecretariaCard key={index} nome={secretaria.nome}
                fone={secretaria.fone}
                id={secretaria.id}
                onDelete={handleDeleteSecretaria}
                onEdit={handleEditSecretaria}

              />
            ))
          ) : (
            <p>Nenhuma secretaria encontrada.</p>
          )}
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
      <button className={styles.backButton} aria-label='Voltar' onClick={handleBackClick}>Voltar</button>
    </main>
  );
}

export default SecretariaList;