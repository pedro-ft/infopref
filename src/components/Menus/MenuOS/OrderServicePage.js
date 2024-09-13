import React, { useState } from 'react'; // Certifique-se de que useState está importado
import Cabecalho from '../../Cabecalho/Cabecalho';
import ActionBar from '../../ActionBarOS/ActionBarOS';
import OrderServiceList from './OrderServiceList';
import styles from './OrderServicePage.module.css';
import { Link } from 'react-router-dom';

// Mova a constante orderServiceData para cá
const orderServiceData = [
  {
    id: '1',
    status: 'Em andamento',
    openDate: '27/05/2024',
    assetNumber: '21009826',
    priority: 'Urgente',
    requester: 'Pedro Ferreira Taborda',
    department: 'Administração',
    secretariat: 'Administração',
    description: 'Tela não da imagem'
  },
  {
    id: '2',
    status: 'Finalizada',
    openDate: '22/05/2024',
    closeDate: '23/05/2024',
    assetNumber: '21007526',
    requester: 'Leonardo Mulinari',
    department: 'Educação e Cultura',
    secretariat: 'Educação e Cultura',
    description: 'Entrada USB do dispositivo não funciona.'
  },
  {
    id: '3',
    status: 'Finalizada',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    requester: 'Jonas de Godoi',
    department: 'Saúde',
    secretariat: 'Saúde',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '4',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '5',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '6',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '7',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '8',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '9',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '10',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
  {
    id: '11',
    status: 'Em aberto',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  }
];

function OrderServicePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const filteredData = orderServiceData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcule o número total de páginas com base na quantidade de ordens de serviço
  const totalPages = Math.ceil(orderServiceData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset para a primeira página quando a pesquisa é alterada
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
      <Link to="/menu" className={styles.backButtonLink}>
        <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </div>
  );
}

export default OrderServicePage;
