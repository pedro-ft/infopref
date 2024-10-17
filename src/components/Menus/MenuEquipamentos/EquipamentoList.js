import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../api/api';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import EquipamentoCard from './EquipamentosCard';
import styles from './EquipamentosList.module.css';


function EquipamentoList() {
  const { id } = useParams();
  console.log('Departamento ID:', id);
  const [departamento, setDepartamento] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Mais recente');
  const itemsPerPage = 6;

  useEffect(() => {
    if (!id) {
      console.error('departamentoId não foi capturado corretamente da URL');
      return;
    }
    const fetchEquipamentos = async () => {
      try {
        const response = await api.get(`/equipamentos/departamento/${id}`);
        setEquipamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar os equipamentos:', error);
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

    fetchEquipamentos();
    fetchDepartamento();
  }, [id]);



  const filteredEquipamentos = equipamentos
  .filter(equipamento =>
    equipamento.num_patrimonio?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    switch (sortType) {
      case 'Mais recente':
      default:
        return b.id - a.id;
      case 'Mais antigo':
        return a.id - b.id;
      case 'Data de Aquisição':
        return a.data_aquisicao - b.data_aquisicao;
      case 'Número de Patrimônio':
        return a.num_patrimonio - b.num_patrimonio;
      case 'Marca':
        return a.marca.localeCompare(b.marca);
    }
  });

  const totalPages = Math.ceil(filteredEquipamentos.length / itemsPerPage); // ACRESCENTADO

  const handlePageChange = (newPage) => {
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

  const handleEditEquipamento = (updatedEquipamento) => {
    const updatedEquipamentos = equipamentos.map(equipamento =>
      equipamento.idEquip === updatedEquipamento.idEquip ? updatedEquipamento : equipamento
    );
    setEquipamentos(updatedEquipamentos);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  /*const handleDeleteEquipamento = async (index) => {
    try {
      await api.delete(`/equipamentos/${equipamentos[index].id}`); // Ajuste a URL conforme necessário
      setEquipamentos(equipamentos.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erro ao excluir o equipamento:', error);
    }
  };*/
  const handleDeleteEquipamento = async (idEquip) => {
    try {
      await api.delete(`/equipamentos/${idEquip}`); // Faz a requisição DELETE ao backend
      setEquipamentos(equipamentos.filter(equipamento => equipamento.id !== idEquip)); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao excluir o equipamento:', error);
    }
  };


  return (
    <main className={styles.equipamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Equipamento' 
      link={`novo-equipamento/${id}`} 
      onSearch={handleSearch} 
      onSort={handleSort}
      sortOptions={['Mais recente', 'Mais antigo', 'Data de Aquisição', 'Marca', 'Número de Patrimônio']} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}> Lista Equipamentos {departamento && `- ${departamento.nome}`} </h2>
        <section className={styles.listSection}>
          {currentItems.length > 0 ? (
            currentItems.map((equipamento, index) => (
              <EquipamentoCard
                key={index}
                idEquip={equipamento.id}
                num_patrimonio={equipamento.num_patrimonio}
                modelo={equipamento.modelo}
                marca={equipamento.marca}
                data_aquisicao={equipamento.data_aquisicao}
                descr_tec={equipamento.descr_tec}
                onEdit={handleEditEquipamento}
                onDelete={handleDeleteEquipamento}
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