import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../api/api';
import ActionBar from '../../ActionBar/ActionBar';
import Cabecalho from '../../Cabecalho/Cabecalho';
import EquipamentoCard from './EquipamentosCard';
import styles from './EquipamentosList.module.css';


function EquipamentoList() {
  const { id } = useParams(); // Obtendo o departamentoId da URL

  const [equipamentos, setEquipamentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6; // ACRESCENTADO




  const fetchEquipamentos = async () => {
    try {
      const response = await api.get(`/equipamentos/departamento/${id}`);
      setEquipamentos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao carregar os equipamentos:', error);
    }
  };

  useEffect(() => {
    if (!id) {
      console.error('departamentoId não foi capturado corretamente da URL');
      return;
    }
    fetchEquipamentos();
  }, [id]);



  const filteredEquipamentos = equipamentos.filter(equipamento =>
    equipamento.num_patrimonio?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEquipamentos.length / itemsPerPage); // ACRESCENTADO

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

  const handleEditEquipamento = (updatedEquipamento) => {
    const updatedEquipamentos = equipamentos.map(equipamento =>
      equipamento.idEquip === updatedEquipamento.idEquip ? updatedEquipamento : equipamento
    );
    setEquipamentos(updatedEquipamentos);
    fetchEquipamentos();
  };

  const handleDeleteEquipamento = async (idEquip) => {
    try {
      // Primeiro, remova as associações no equip_dep
      await api.delete(`/equipamentos/equip_dep/equipamento/${idEquip}`);

      // Depois, remova o próprio equipamento
      //await api.delete(`/equipamentos/${idEquip}`);

      // Atualize a lista de equipamentos no front-end
      setEquipamentos(equipamentos.filter(equipamento => equipamento.id !== idEquip));
    } catch (error) {
      console.error('Erro ao excluir o equipamento:', error);
    }
  };



  return (
    <main className={styles.equipamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Equipamento' link={`novo-equipamento/${id}`} onSearch={handleSearch} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Equipamentos</h2>
        <section className={styles.listSection}>
          {currentItems.length > 0 ? (
            currentItems.map((equipamento, index) => (
              <EquipamentoCard
                key={index}
                idEquip={equipamento.id}
                num_patrimonio={equipamento.num_patrimonio}
                modelo={equipamento.modelo}
                marca={equipamento.marca}
                data_aquisicao={format(equipamento.data_aquisicao, "dd/MM/yyyy")}
                descr_tec={equipamento.descr_tec}
                onEdit={handleEditEquipamento}
                onDelete={handleDeleteEquipamento} // Adicione essa função no EquipamentoList
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