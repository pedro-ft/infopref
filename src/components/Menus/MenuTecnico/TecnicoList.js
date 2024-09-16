import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTecnicos } from '../../../api/tecnico';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import TecnicoCard from './TecnicoCard';
import styles from './TecnicoList.module.css';

/*const initialTecnicos = [
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
];*/

function TecnicoList() {
  const [tecnicos, setTecnicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // ACRESCENTADO
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6; // ACRESCENTADO
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const data = await getAllTecnicos();
        setTecnicos(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar tecnicos:', error);
        setLoading(false);
      }
    };
    fetchTecnicos();
  }, [updateTrigger]);

  const filteredTecnicos = tecnicos.filter(tecnico =>
    tecnico.nome.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleEditTecnico = (updatedTecnico) => {
    const updatedTecnicos = tecnicos.map(tecnico =>
      tecnico.id === updatedTecnico.id ? updatedTecnico : tecnico
    );
    setTecnicos(updatedTecnicos);
  };

  const handleDeleteTecnico = (id) => {
    setTecnicos(tecnicos.filter(tecnico => tecnico.id !== id));
  };

  const handleAddTecnico = () => {
    setUpdateTrigger(updateTrigger + 1); // Atualize a lista ao adicionar um técnico
  };

  return (
    <main className={styles.tecnicosModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Técnico' link='novo-tecnico' onSearch={handleSearch} onAdd={handleAddTecnico} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Técnicos</h2>
        <section className={styles.listSection}>
          {currentItems.map((tecnico, index) => (
            <TecnicoCard key={index} nome={tecnico.nome}
              fone={tecnico.fone}
              id={tecnico.id}
              onDelete={handleDeleteTecnico}
              onEdit={handleEditTecnico}
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