import React from 'react';
import Cabecalho from '../Cabecalho/Cabecalho';
import ActionBar from '../ActionBarOS/ActionBarOS';
import OrderServiceList from './OrderServiceList';
import styles from './OrderServicePage.module.css';
import { Link } from 'react-router-dom';

function OrderServicePage() {
  return (
    <div className={styles.orderServicePage}>
      <Cabecalho />
      <ActionBar />
      <main className={styles.mainContent}>
        <OrderServiceList />
      </main>
      <Link to="/menu" className={styles.backButtonLink}>
      <button className={styles.backButton} aria-label='Voltar'>Voltar</button>
      </Link>
    </div>
  );
}

export default OrderServicePage;