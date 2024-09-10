import React from 'react';
import styles from './EquipamentosCard.module.css';

function EquipamentoCard({ patrimonio, modelo, marca, dataCompra, descrTec, imageUrl }) {
  return (
    <article className={styles.card}>
      <img src={imageUrl} alt={`Equipamento avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.name}>Nº de Patrimônio: {patrimonio}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Modelo: {modelo}</p>
            <p>Marca: {marca}</p>
            <p>Data de Aquisição: {dataCompra}</p>
          </div>
          <div className={styles.cardSideSection}>
            <p className={styles.descrTec}>Descrição Técnica: {descrTec}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.editButton} aria-label="Edit">
              <img src="imagens/Editar.svg" alt="" />
            </button>
            <button className={styles.deleteButton} aria-label="Delete">
              <img src="imagens/Excluir.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EquipamentoCard;
