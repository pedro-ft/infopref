import React from 'react';
import styles from './MinhasSolicitacoes.module.css';

function MinhasSolicitacoesItem({ id, data_abertura, data_finalizacao, status, descricao, imageUrl }) {
  return (
    <article className={styles.card}>
      <img src={imageUrl} alt={`Ordem avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.name}>Número de Protocolo: {id}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Data Abertura: {data_abertura}</p>
            <p>Data Finalização: {data_finalizacao}</p>
            <p>Status: {status}</p>
          </div>
          <div className={styles.cardSideSection}>
            <p className={styles.descricao}>Descrição: {descricao}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MinhasSolicitacoesItem;