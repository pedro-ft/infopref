import React from 'react';
import styles from './OrderServiceItem.module.css';

function OrderServiceItem({
  id,
  status,
  openDate,
  closeDate,
  assetNumber,
  priority,
  requester,
  department,
  secretariat,
  description
}) {
  return (
    <article className={styles.orderServiceItem}>
      <img src="/imagens/ordem.svg" alt="" className={styles.itemIcon} />
      <div className={styles.itemContent}>
        <div className={styles.itemHeader}>
          <h3 className={styles.protocolNumber}>Número de Protocolo: {id}</h3>
        </div>
        <div className={styles.itemDetails}>
          <div className={styles.itemInfo}>
            <p>Data Abertura: {openDate}</p>
            {closeDate && <p>Data Finalização: {closeDate}</p>}
            <p>Nº de patrimônio: {assetNumber}</p>
            {priority && <p>Prioridade: {priority}</p>}
            <p>Status: {status}</p>
          </div>
          <div className={styles.itemRequester}>
            <p>Solicitante: {requester}</p>
            <p>Secretaria: {secretariat}</p>
            <p>Departamento: {department}</p>
          </div>
        </div>
        {description && <p className={styles.itemDescription}>Descrição: {description}</p>}
      </div>
    </article>
  );
}

export default OrderServiceItem;