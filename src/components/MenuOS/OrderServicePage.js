import React from 'react';
import Cabecalho from '../Cabecalho/Cabecalho';
import ActionBar from '../ActionBar/ActionBar';
import OrderServiceList from './OrderServiceList';
import styles from './OrderServicePage.module.css';

function OrderServicePage() {
  return (
    <div className={styles.orderServicePage}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <ActionBar />
        <OrderServiceList />
        <button className={styles.backButton}>Voltar</button>
      </main>
    </div>
  );
}

export default OrderServicePage;