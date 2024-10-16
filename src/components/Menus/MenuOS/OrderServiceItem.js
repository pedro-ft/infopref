import React from 'react';
import styles from './OrderServiceItem.module.css';

function OrderServiceItem({
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
    <article className={styles.orderServiceItem} onClick={onClick}>
      <img src="/imagens/ordem.svg" alt="" className={styles.itemIcon} />
      <div className={styles.itemContent}>
        <div className={styles.itemHeader}>
          <h3 className={styles.protocolNumber}>Número de Protocolo: {id}</h3>
        </div>
        <div className={styles.itemDetails}>
          <div className={styles.itemInfo}>
            <p>Data Abertura: {openDate}</p>
            {closeDate && <p>Data Finalização: {closeDate}</p>}
            <p>Nº de patrimônio: {patrimonio}</p>
            <p>Tipo Chamado: {tipo_chamado}</p>
            {priority && <p>Prioridade: {priority}</p>}
            <p>Status: {status}</p>
          </div>
          <div className={styles.itemRequester}>
            <p>Solicitante: {requester}</p>
            <p>Secretaria: {secretariat}</p>
            <p>Departamento: {department}</p>
            <p>Técnico: {tecnico}</p>
          </div>
        </div>
        {description && <p className={styles.itemDescription}>Descrição: {description}
        </p>}
        {resolucao && <p className={styles.itemDescription}>Resolução: {resolucao}
        </p>}
      </div>
    </article>
  );
}

export default OrderServiceItem;