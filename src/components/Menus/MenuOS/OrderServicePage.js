import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrdemServico } from '../../../api/ordemServico';
import ActionBar from '../../ActionBarOS/ActionBarOS';
import Cabecalho from '../../Cabecalho/Cabecalho';
import { UserContext } from '../../context/UserContext';
import OrderServiceForm from './OrderServiceForm';
import OrderServiceList from './OrderServiceList';

import styles from './OrderServicePage.module.css';

function OrderServicePage() {
  const { userProfile } = useContext(UserContext);
  const [ordemServicos, setOrdemServicos] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Mais recentes');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 5;


  const fetchOrdemServicos = async () => {
    try {

      const data = await getAllOrdemServico();
      const filteredData = data.filter(
        (item) =>
          item.status === 'EM_ANDAMENTO' ||
          item.status === 'AGUARDANDO_PEÇAS' ||
          item.status === 'FINALIZADO'
      );
      setOrdemServicos(filteredData);

    } catch (error) {
      console.error('Erro ao carregar ordem de servico:', error);

    }
  };
  useEffect(() => {
    fetchOrdemServicos();
  }, []);


  const filteredData = ordemServicos
  .filter(item =>
    item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.solicitante.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.solicitante.departamento.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    switch (sortType) {
      case 'Mais antigo':
        return a.id - b.id;
      case 'Tipo Chamado':
        return a.tipo_chamado.localeCompare(b.tipo_chamado);
      case 'Prioridade':
        const prioridadeOrder = { 'Urgente': 1, 'Normal': 2, 'Baixa': 3 };
        return prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade];
      case 'Status':
        return a.status.localeCompare(b.status);
      case 'Departamento':
         return a.solicitante.departamento.nome.localeCompare(b.solicitante.departamento.nome);
      case 'Secretaria':
        return a.solicitante.departamento.secretaria.nome.localeCompare(b.solicitante.departamento.secretaria.nome);
      case 'Solicitante':
        return a.solicitante.nome.localeCompare(b.solicitante.nome);
      case 'Técnico':
        return a.tecnico.nome.localeCompare(b.tecnico.nome);
      case 'Mais recente':
      default:
        return b.id - a.id;
    }
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleOrderClick = (order) => {
    console.log('Ordem Selecionada:', order);
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleBackClick = () => {
    if (userProfile === 'ADM') {
      navigate('/menu');
    } else if (userProfile === 'TECNICO') {
      navigate('/menu2');
    }
  };

  const handleSave = () => {
    fetchOrdemServicos();
  };

  const handleDelete = (deletedOrderId) => {
    setOrdemServicos(prevOrdemServicos =>
      prevOrdemServicos.filter(order => order.id !== deletedOrderId)
    );
    closeModal();
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  return (
    <div className={styles.orderServicePage}>
      <Cabecalho />
      <ActionBar onSearch={handleSearch}
      onSort={handleSort}
      sortOptions={['Mais recente', 'Mais antigo', 'Prioridade', 'Status', 'Tipo Chamado', 'Secretaria', 'Departamento', 'Solicitante', 'Técnico']} />
      <main className={styles.mainContent}>
        <OrderServiceList
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onOrderClick={handleOrderClick}
        />
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
      </main>
      {selectedOrder && (
        <OrderServiceForm
          order={selectedOrder}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={() => handleDelete(selectedOrder.id)}
        />
      )}
      <button onClick={handleBackClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </div>



  );
}

export default OrderServicePage;
