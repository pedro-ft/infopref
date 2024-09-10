import React from 'react';
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
  }
];

function EquipamentoList() {
  return (
    <main className={styles.equipamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Equipamento'/>
      <div className={styles.contentWrapper}>
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Lista Equipamentos</h2>
          {equipamentos.map((equipamento, index) => (
            <DepartamentoCard key={index} {...equipamento} />
          ))}
        </section>
      </div>
      <Link to="/departamentos" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default EquipamentoList;