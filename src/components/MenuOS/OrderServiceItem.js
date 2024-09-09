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
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/361c1bb64c8bc959513385c54b7cb074927f0dc31bc366af767742dce07dfd5d?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8" alt="" className={styles.itemIcon} />
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