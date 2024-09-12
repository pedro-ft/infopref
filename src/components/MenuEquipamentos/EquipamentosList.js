import React, { useState } from 'react';
import styles from './EquipamentosList.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import DepartamentoCard from './EquipamentosCard';
import ActionBar from '../ActionBar/ActionBar';
import {Link} from 'react-router-dom';

const equipamentos = [
  {
    patrimonio: "21009826",
    modelo: "Notebook Inspiron 15",
    marca: "Dell",
    dataCompra: "29/03/2022",
    descrTec: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
    imageUrl: "/imagens/Equipamentos.svg"
  },
  {
    patrimonio: "21007926",
    modelo: "Geforce RTX 4090",
    marca: "Nvidia",
    dataCompra: "20/11/2023",
    descrTec: "Placa de vídeo 24GB, GDDR6X, 384-BIT",
    imageUrl: "/imagens/Equipamentos.svg"
  },
  {
    patrimonio: "21007926",
    modelo: "Geforce RTX 4090",
    marca: "Nvidia",
    dataCompra: "20/11/2023",
    descrTec: "Placa de vídeo 24GB, GDDR6X, 384-BIT",
    imageUrl: "/imagens/Equipamentos.svg"
  },
  {
    patrimonio: "21007926",
    modelo: "Geforce RTX 4090",
    marca: "Nvidia",
    dataCompra: "20/11/2023",
    descrTec: "Placa de vídeo 24GB, GDDR6X, 384-BIT",
    imageUrl: "/imagens/Equipamentos.svg"
  },
  {
    patrimonio: "21007926",
    modelo: "Geforce RTX 4090",
    marca: "Nvidia",
    dataCompra: "20/11/2023",
    descrTec: "Placa de vídeo 24GB, GDDR6X, 384-BIT",
    imageUrl: "/imagens/Equipamentos.svg"
  },
  {
    patrimonio: "21007926",
    modelo: "Geforce RTX 4090",
    marca: "Nvidia",
    dataCompra: "20/11/2023",
    descrTec: "Placa de vídeo 24GB, GDDR6X, 384-BIT",
    imageUrl: "/imagens/Equipamentos.svg"
  },
  {
    patrimonio: "21007926",
    modelo: "Geforce RTX 4090",
    marca: "Nvidia",
    dataCompra: "20/11/2023",
    descrTec: "Placa de vídeo 24GB, GDDR6X, 384-BIT",
    imageUrl: "/imagens/Equipamentos.svg"
  },
];

function EquipamentoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6; // ACRESCENTADO

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

  return (
    <main className={styles.equipamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Equipamento' link='novo-equipamento' onSearch={handleSearch}/>
      <div className={styles.contentWrapper}>
        <h2 className={styles.listTitle}>Lista Equipamentos</h2>
        <section className={styles.listSection}>
          {currentItems.map((equipamento, index) => (
            <DepartamentoCard key={index} {...equipamento} />
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
      <Link to="/departamentos" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default EquipamentoList;