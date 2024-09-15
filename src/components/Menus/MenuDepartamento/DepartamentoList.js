import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext'; // Importa o contexto
import { useNavigate } from 'react-router-dom';
import styles from './DepartamentoList.module.css';
import Cabecalho from '../../Cabecalho/Cabecalho';
import DepartamentoCard from './DepartamentoCard';
import ActionBar from '../../ActionBar/ActionBar';

const initialDepartamentos = [
    {
      name: "Educação e Saúde",
      phone: "(42) 3231-3434",
      imageUrl: "/imagens/Secretaria.svg"
    },
    {
      name: "Segurança Pública",
      phone: "(42) 3231-4545",
      imageUrl: "/imagens/Secretaria.svg"
    },
    {
      name: "Transportes e Trânsito",
      phone: "(42) 3231-5656",
      imageUrl: "/imagens/Secretaria.svg"
    },
    {
      name: "Ambiente e Sustentabilidade",
      phone: "(42) 3231-6767",
      imageUrl: "/imagens/Secretaria.svg"
    },
    {
      name: "Cultura e Lazer",
      phone: "(42) 3231-7878",
      imageUrl: "/imagens/Secretaria.svg"
    },
    {
      name: "Desenvolvimento Econômico",
      phone: "(42) 3231-8989",
      imageUrl: "/imagens/Secretaria.svg"
    },
    {
      name: "Assistência Social",
      phone: "(42) 3231-9090",
      imageUrl: "/imagens/Secretaria.svg"
    },
    {
      name: "Planejamento Urbano",
      phone: "(42) 3231-2121",
      imageUrl: "/imagens/Secretaria.svg"
    }
];

function DepartamentoList() {
  const [departamentos, setDepartamentos] = useState(initialDepartamentos);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // ACRESCENTADO
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa
  const itemsPerPage = 6; // ACRESCENTADO

  const filteredDepartamentos = departamentos.filter(departamento =>
    departamento.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(departamentos.length / itemsPerPage); // ACRESCENTADO

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

  const handleBackButtonClick = () => {
    if (username === 'Jonas de Godoi') {
      navigate('/menu2');
    } else {
      navigate('/menu');
    }
  };
  
  const handleEditDepartamento = (index, updatedDepartamento) => {
    const updatedDepartamentos = [...departamentos];
    updatedDepartamentos[index] = updatedDepartamento;
    setDepartamentos(updatedDepartamentos);
  };

  return (
    <main className={styles.departamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Departamento' link='novo-departamento' onSearch={handleSearch} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Departamentos</h2>
        <section className={styles.listSection}>
          {currentItems.map((departamento, index) => (
            <DepartamentoCard key={index} {...departamento} 
            onEdit={(updatedDepartamento) => handleEditDepartamento(startIndex + index, updatedDepartamento)}
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
      <button onClick={handleBackButtonClick} className={styles.backButton} aria-label='Voltar'>Voltar</button>
    </main>
  );
}

export default DepartamentoList;