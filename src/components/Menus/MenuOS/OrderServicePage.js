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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrdemServicos = async () => {
      try {

        const data = await getAllOrdemServico();
        // Filtra as ordens de serviço com status EM-ANDAMENTO, AGUARDANDO_PEÇAS ou FINALIZADO
        const filteredData = data.filter(
          (item) =>
            item.status === 'EM_ANDAMENTO' ||
            item.status === 'AGUARDANDO_PEÇAS' ||
            item.status === 'FINALIZADO'
        );
        setOrdemServicos(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar ordem de servico:', error);
        setLoading(false);
      }
    };
    fetchOrdemServicos();
  }, []);


  const filteredData = ordemServicos.filter(item =>
    item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className={styles.orderServicePage}>
      <Cabecalho />
      <ActionBar onSearch={handleSearch} />
      <main className={styles.mainContent}>
        <OrderServiceList
          data={filteredData} // Passe os dados como props
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
        />
      )}
      <button onClick={handleBackClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </div>



  );
}

export default OrderServicePage;
