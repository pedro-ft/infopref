import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../api/api';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import InfoInternetCard from './InfoInternetCard';
import styles from './InfoInternetList.module.css';

function InfoInternetList() {
  const { id } = useParams();
  const [departamento, setDepartamento] = useState(null);
  const [infosInternet, setInfosInternet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Mais recente');
  const itemsPerPage = 6;

  useEffect(() => {
    if (!id) {
      console.error('departamentoId não foi capturado corretamente da URL');
      return;
    }
    const fetchInfoInternet = async () => {
      try {
        const response = await api.get(`/infoInternet/departamento/${id}`);
        setInfosInternet(response.data);
      } catch (error) {
        console.error('Erro ao carregar as InfoInternet', error);
      }
    };

    const fetchDepartamento = async () => {
      try {
        const response = await api.get(`/departamentos/${id}`);
        setDepartamento(response.data);
      } catch (error) {
        console.error('Erro ao carregar o departamento:', error);
      }
    };

    fetchInfoInternet();
    fetchDepartamento();
  }, [id]);

  const filteredInfoInternet = infosInternet
    .filter(infoInternet =>
      infoInternet.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortType) {
        case 'Mais recente':
        default:
          return b.id - a.id;
        case 'Mais antigo':
          return a.id - b.id;
        case 'Nome da Rede':
          return a.nome.localeCompare(b.nome);
      }
    });

  const totalPages = Math.ceil(filteredInfoInternet.length / itemsPerPage); // ACRESCENTADO

  const handlePageChange = (newPage) => { // ACRESCENTADO
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage; // ACRESCENTADO
  const currentItems = filteredInfoInternet.slice(startIndex, startIndex + itemsPerPage); // ACRESCENTADO

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  const handleEditInfoInternet = async () => {
    try {
      const response = await api.get(`/infoInternet/departamento/${id}`);
      setInfosInternet(response.data);
    } catch (error) {
      console.error('Erro ao carregar as InfoInternet:', error);
    }
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleDeleteInfoInternet = async (idInfoInternet) => {
    try {
      const response = await api.get(`/infoInternet/departamento/${id}`);
      setInfosInternet(response.data);
    } catch (error) {
      console.error('Erro ao excluir a InfoInternet:', error);
    }
  };

  return (
    <main className={styles.infoInternetModule}>
      <Cabecalho />
      <ActionBar
        tipo='Nova Informação de Internet'
        link={`novo-info-internet/${id}`}
        onSearch={handleSearch}
        onSort={handleSort}
        sortOptions={['Mais recente', 'Mais antigo', 'Nome da Rede']} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Informações de Internet {departamento && `- ${departamento.nome}`}</h2>
        <section className={styles.listSection}>
          {currentItems.length > 0 ? (
            currentItems.map((infoInternet, index) => (
              <InfoInternetCard
                key={index}
                idInfoInternet={infoInternet.id}
                nome={infoInternet.nome}
                senha={infoInternet.senha}
                ip={infoInternet.ip}
                onEdit={handleEditInfoInternet}
                onDelete={handleDeleteInfoInternet}
              />
            ))
          ) : (
            <p>Nenhuma informação de internet encontrada.</p>
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
      <Link to="/departamentos" className={styles.backButtonLink}>
        <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}


export default InfoInternetList;