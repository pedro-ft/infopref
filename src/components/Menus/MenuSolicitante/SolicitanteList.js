import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSolicitantes } from '../../../api/solicitante';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import { UserContext } from '../../context/UserContext';
import SolicitanteCard from './SolicitanteCard';
import styles from './SolicitanteList.module.css';

function SolicitanteList() {
  const { userProfile } = useContext(UserContext);
  const [solicitantes, setSolicitantes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Ordem Alfabética');
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchSolicitantes = async () => {
      try {

        const data = await getAllSolicitantes();
        console.log('Solicitantes retornados:', data);
        setSolicitantes(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar solicitantes:', error);
        setLoading(false);
      }
    };
    fetchSolicitantes();
  }, []);

  const filteredSolicitantes = solicitantes
  .filter(solicitante =>
    solicitante.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    switch (sortType) {
      case 'Mais recente':
        return b.id - a.id;
      case 'Mais antigo':
        return a.id - b.id;
      case 'Secretaria':
        return a.departamento.secretaria.nome.localeCompare(b.departamento.secretaria.nome);
      case 'Departamento':
        return a.departamento.nome.localeCompare(b.departamento.nome);
      case 'Ordem alfabética':
      default:
        return a.nome.localeCompare(b.nome);
    }
  });

  const totalPages = Math.ceil(filteredSolicitantes.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredSolicitantes.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  const handleEditSolicitante = (updatedSolicitante) => {
    console.log('Dados atualizados:', updatedSolicitante);
    const updatedSolicitantes = solicitantes.map(solicitante =>
      solicitante.id === updatedSolicitante.id ? updatedSolicitante : solicitante
    );
    setSolicitantes(updatedSolicitantes);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleDeleteSolicitante = (id) => {
    setSolicitantes(solicitantes.filter(solicitante => solicitante.id !== id));
  };

  const handleBackClick = () => {
    if (userProfile === 'ADM') {
      navigate('/menu');
    } else if (userProfile === 'TECNICO') {
      navigate('/menu2');
    }
  };

  if (loading) {
    return <p>Carregando solicitantes...</p>;
  }


  return (
    <main className={styles.solicitanteModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Solicitante' 
      link='novo-solicitante' 
      onSearch={handleSearch}
      onSort={handleSort}
      sortOptions={['Ordem alfabética', 'Secretaria', 'Departamento', 'Mais recente', 'Mais antigo']} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Solicitantes</h2>
        <section className={styles.listSection}>
          {currentItems.length > 0 ? (
            currentItems.map((solicitante, index) => (
              <SolicitanteCard key={solicitante.id}
                nome={solicitante.nome}
                departamento={solicitante.departamento.nome}
                secretariat={solicitante.departamento.secretaria.nome}
                fone={solicitante.fone}
                id={solicitante.id}
                id_acesso_remoto={solicitante.id_acesso_remoto}
                onEdit={handleEditSolicitante}
                onDelete={handleDeleteSolicitante}
              />
            ))
          ) : (
            <p>Nenhum solicitante encontrado.</p>
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
      <button onClick={handleBackClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </main>
  );
}

export default SolicitanteList;