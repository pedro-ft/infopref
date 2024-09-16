import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDepartamentos } from '../../../api/departamento';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import { UserContext } from '../../context/UserContext'; // Importa o contexto
import DepartamentoCard from './DepartamentoCard';
import styles from './DepartamentoList.module.css';

function DepartamentoList() {
  const [departamentos, setDepartamentos] = useState([]);
  const { userProfile } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // ACRESCENTADO
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6; // ACRESCENTADO

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const data = await getAllDepartamentos();
        setDepartamentos(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
        setLoading(false);
      }
    };
    fetchDepartamentos();
  }, []);

  const filteredDepartamentos = departamentos.filter(departamento =>
    departamento.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartamentos.length / itemsPerPage); // ACRESCENTADO

  const handlePageChange = (newPage) => { // ACRESCENTADO
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage; // ACRESCENTADO
  const currentItems = filteredDepartamentos.slice(startIndex, startIndex + itemsPerPage); // ACRESCENTADO

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }

  const handleBackClick = () => {
    if (userProfile === 'ADM') {
      navigate('/menu');
    } else if (userProfile === 'TECNICO') {
      navigate('/menu2');
    }
  };

  const handleEditDepartamento = (updatedDepartamento) => {
    const updatedDepartamentos = departamentos.map(departamento =>
      departamento.id === updatedDepartamento.id ? updatedDepartamento : departamento
    );
    setDepartamentos(updatedDepartamentos);
  };

  const handleDeleteDepartamento = (id) => {
    setDepartamentos(departamentos.filter(departamento => departamento.id !== id));
  };

  return (
    <main className={styles.departamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Departamento' link='novo-departamento' onSearch={handleSearch} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Departamentos</h2>
        <section className={styles.listSection}>
          {currentItems.map((departamento, index) => (
            <DepartamentoCard key={index}
              id={departamento.id}
              nome={departamento.nome}
              fone={departamento.fone}
              onDelete={handleDeleteDepartamento}
              onEdit={handleEditDepartamento}
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
      <button onClick={handleBackClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </main>
  );
}

export default DepartamentoList;