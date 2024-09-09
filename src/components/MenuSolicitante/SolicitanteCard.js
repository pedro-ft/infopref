import React from 'react';
import styles from './SolicitanteCard.module.css';

function SolicitanteCard({ name, department, secretariat, phone, remoteAccessId, imageUrl }) {
  return (
    <article className={styles.card}>
      <img src={imageUrl} alt={`${name}'s avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.verticalLine} />
          <h3 className={styles.name}>Nome: {name}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Secretaria: {secretariat}</p>
            <p>Departamento: {department}</p>
            <p>Fone: {phone}</p>
            <p>ID de Acesso Remoto: {remoteAccessId}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.editButton} aria-label="Edit">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bfab943358638e122e9d0534ca097562d41931e77a2bbe37e9cea1047967820?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8" alt="" />
            </button>
            <button className={styles.deleteButton} aria-label="Delete">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e6a5979990b7ae095573dea50d5ec51331af328f676ad90c2636fb0d7942976?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8" alt="" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SolicitanteCard;