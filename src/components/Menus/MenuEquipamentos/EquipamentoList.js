import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../api/api';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import DepartamentoCard from './EquipamentosCard';
import styles from './EquipamentosList.module.css';


function EquipamentoList() {
  const { departamentoId } = useParams(); // Obtendo o departamentoId da URL
  console.log('Departamento ID:', departamentoId);

  const [equipamentos, setEquipamentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6; // ACRESCENTADO

  useEffect(() => {
    if (!departamentoId) {
      console.error('departamentoId não foi capturado corretamente da URL');
      return;
    }

    const fetchEquipamentos = async () => {
      try {
        const response = await api.get(`/departamentos/${departamentoId}/equipamentos`);
        setEquipamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar os equipamentos:', error);
      }
    };

    fetchEquipamentos();
  }, [departamentoId]);

  const filteredEquipamentos = equipamentos.filter(equipamento =>
    equipamento.patrimonio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(equipamentos.length / itemsPerPage); // ACRESCENTADO

  const handlePageChange = (newPage) => { // ACRESCENTADO
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage; // ACRESCENTADO
  const currentItems = filteredEquipamentos.slice(startIndex, startIndex + itemsPerPage); // ACRESCENTADO

  const handleEditEquipamento = (index, updatedEquipamento) => {
    const updatedEquipamentos = [...equipamentos];
    updatedEquipamentos[index] = updatedEquipamento;
    setEquipamentos(updatedEquipamentos);
  };

  return (
    <main className={styles.equipamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Equipamento' link={'novo-equipamento'} onSearch={handleSearch} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Equipamentos</h2>
        <section className={styles.listSection}>
          {currentItems.length > 0 ? (
            currentItems.map((equipamento, index) => (
              <DepartamentoCard //??
                key={index}
                {...equipamento}
                onEdit={(updatedEquipamento) => handleEditEquipamento(startIndex + index, updatedEquipamento)}
              />
            ))
          ) : (
            <p>Nenhum equipamento encontrado.</p>
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

export default EquipamentoList;