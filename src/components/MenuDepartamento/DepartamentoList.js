import React from 'react';
import styles from './DepartamentoList.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import DepartamentoCard from './DepartamentoCard';
import ActionBar from '../ActionBar/ActionBar';
import {Link} from 'react-router-dom';

const departamentos = [
  {
    name: "Educação e Saúde",
    phone: "(42) 3231-3434",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Segurança",
    phone: "(42) 3231-7433",
    imageUrl: "/imagens/Secretaria.svg"
  },
  {
    name: "Educação",
    phone: "(42) 3231-3234",
    imageUrl: "/imagens/Secretaria.svg"
  }
];

function DepartamentoList() {
  return (
    <main className={styles.departamentoModule}>
      <Cabecalho />
      <ActionBar tipo='Novo Departamento'/>
      <div className={styles.contentWrapper}>
        <section className={styles.listSection}>
          <h2 className={styles.listTitle}>Lista Departamentos</h2>
          {departamentos.map((departamento, index) => (
            <DepartamentoCard key={index} {...departamento} />
          ))}
        </section>
      </div>
      <Link to="/menu" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </main>
  );
}

export default DepartamentoList;