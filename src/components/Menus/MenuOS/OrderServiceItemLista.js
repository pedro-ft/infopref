import React from 'react';
import styles from './OrderServiceItemLista.module.css';

function OrderServiceItemLista({
  id,
  tipo_chamado,
  status,
  openDate,
  closeDate,
  patrimonio,
  priority,
  requester,
  department,
  secretariat,
  description,
  tecnico,
  resolucao,
  onClick,
}) {
  return (
    <div className={styles.orderServiceItemLista} onClick={onClick}>
      <span className={styles.itemField}>{id}</span>
      <span className={styles.itemField}>{openDate}</span>
      <span className={styles.itemField}>{closeDate || '-'}</span>
      <span className={styles.itemField}>{patrimonio}</span>
      <span className={styles.itemField}>{tipo_chamado}</span>
      <span className={styles.itemField}>{priority || '-'}</span>
      <span className={styles.itemField}>{status}</span>
      <span className={styles.itemField}>{requester}</span>
      <span className={styles.itemField}>{secretariat}</span>
      <span className={styles.itemField}>{department}</span>
      <span className={styles.itemField}>{tecnico}</span>
    </div>
  );
}

export default OrderServiceItemLista;
