import React, { useState, useContext } from 'react'; 
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../../Cabecalho/Cabecalho';
import ActionBar from '../../ActionBarOS/ActionBarOS';
import OrderServiceList from './OrderServiceList';
import OrderServiceForm from './OrderServiceForm'
import styles from './OrderServicePage.module.css';

// Mova a constante orderServiceData para cá
const orderServiceData = [
  {
    id: '1',
    tipoChamado: 'Troca de Peças',
    status: 'Em andamento',
    openDate: '27/05/2024',
    closeDate: '29/05/2024',
    patrimonio: '21009826',
    priority: 'Urgente',
    requester: 'Pedro Ferreira Taborda',
    department: 'Administração',
    secretariat: 'Administração',
    description: 'Tela não aparece nenhuma imagem.',
    tecnico: 'Leonardo Mulinari',
    resolucao: 'Placa de Vídeo deu defeito e não funcionava mais, foi realizada a troca.'
  },
  {
    id: '2',
    tipoChamado: 'Troca de Peças',
    status: 'Em andamento',
    openDate: '27/05/2024',
    closeData: '29/05/2024',
    patrimonio: '21009826',
    priority: 'Urgente',
    requester: 'Pedro Ferreira Taborda',
    department: 'Administração',
    secretariat: 'Administração',
    description: 'Tela não aparece nenhuma imagem.',
    tecnico: 'Leonardo Mulinari',
    resolucao: 'Placa de Vídeo deu defeito e não funcionava mais, foi realizada a troca.'
  }
];

function OrderServicePage() {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 5;

  const filteredData = orderServiceData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleBackButtonClick = () => {
    if (username === 'Jonas de Godoi') {
      navigate('/menu2');
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className={styles.orderServicePage}>
      <Cabecalho />
      <ActionBar onSearch={handleSearch}/>
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
        <button onClick={handleBackButtonClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </div>


    
  );
}

export default OrderServicePage;
