import React from 'react';
import styles from './MinhasSolicitacoes.module.css';

function MinhasSolicitacoesItem({ id, data_abertura, data_finalizacao, status, patrimonio, descricao, resolucao }) {
  return (
    <article className={styles.card}>
      <img src='/imagens/ordem.svg' alt={`Ordem avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.name}>Número de Protocolo: {id}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Data Abertura: {data_abertura}</p>
            {data_finalizacao && <p>Data Finalização: {data_finalizacao}</p>}
            <p>Status: {status}</p>
            <p>Nº de patrimônio: {patrimonio && patrimonio.length > 0 ? patrimonio : "Não especificado"}</p>

          </div>
          <div className={styles.cardSideSection}>
            <p className={styles.descricao}>Descrição: {descricao}</p>
            <p className={styles.descricao}>Resolução: {resolucao}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MinhasSolicitacoesItem;