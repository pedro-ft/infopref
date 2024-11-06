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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Mais recentes');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isListView, setIsListView] = useState(true);
  const navigate = useNavigate();
  const itemsPerPage = isListView ? 30 : 5;

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
    .filter(item => {
      const searchParts = searchTerm.toLowerCase().split(" ");
      return searchParts.every(part =>
        item.id.toString().toLowerCase().includes(part) ||
        item.solicitante.nome.toLowerCase().includes(part) ||
        item.tecnico.nome.toLowerCase().includes(part) ||
        item.status.toLowerCase().includes(part) ||
        item.solicitante.departamento.nome.toLowerCase().includes(part) ||
        item.solicitante.departamento.secretaria.nome.toLowerCase().includes(part) ||
        item.prioridade.toLowerCase().includes(part)
      );
    })
    .filter(item => {
      const itemDate = new Date(item.data_abertura);
      const start = startDate ? new Date(startDate + 'T00:00:00') : null;
      const end = endDate ? new Date(endDate + 'T23:59:59') : null;
      return (!start || itemDate >= start) && (!end || itemDate <= end);
    })
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
      <h2 className={styles.listTitle}>Lista Ordem de Serviços</h2>
      <h3 className={styles.filterTitle}>Filtre as Ordens de Serviços exibidas por um período:</h3>
      <div className={styles.filterContainer}>
        <label>
          Data de Início:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Data de Fim:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button className={styles.toggleButton} onClick={() => setIsListView(!isListView)}>
          Exibir em {isListView ? 'Cards' : 'Linhas'}
        </button>
      </div>
      <main className={styles.mainContent}>
        <OrderServiceList
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onOrderClick={handleOrderClick}
          isListView={isListView}
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
