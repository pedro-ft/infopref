import React from 'react';
import styles from './SecretariaCard.module.css';

function SecretariaCard({ name, phone, imageUrl }) {
  return (
    <article className={styles.card}>
      <img src={imageUrl} alt={`${name}'s avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.name}>Secretaria de {name}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Fone: {phone}</p>
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

export default SecretariaCard;
