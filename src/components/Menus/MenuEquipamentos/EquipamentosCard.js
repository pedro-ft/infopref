import React, { useState } from 'react';
import EditForm from '../EditForm/EditForm'
import styles from './EquipamentosCard.module.css';

function EquipamentoCard({ patrimonio, modelo, marca, dataCompra, descrTec, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    closeModal();
    if (onDelete) {
      onDelete();
    }
  };

  const handleEdit = (updatedData) => {
    setIsEditing(false);
    onEdit(updatedData); // Chama a função de edição passando os novos dados
    console.log('Objeto editado:', updatedData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const fields = [
    { name: 'patrimonio', label: 'Número de Patrimônio', type: 'number' },
    { name: 'modelo', label: 'Modelo', type: 'text' },
    { name: 'marca', label: 'Marca', type: 'text' },
    { name: 'dataCompra', label: 'Data de Aquisição', type: 'date' },
    { name: 'descrTec', label: 'Descrição Técnica', type: 'text' },
  ];

  return (
  <>
    <article className={styles.card}>
      <img src="/imagens/Equipamentos.svg" alt={`Equipamento avatar`} className={styles.avatar} />
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
            <button className={styles.editButton} aria-label="Edit" onClick={() => setIsEditing(true)}>
              <img src="imagens/Editar.svg" alt="" />
            </button>
            <button className={styles.deleteButton} onClick={openModal} aria-label="Delete">
              <img src="imagens/Excluir.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </article>

   {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o equipamento {patrimonio}?</p>
            <div className={styles.modalActions}>
              <button onClick={handleConfirmDelete} className={styles.confirmButton}>Sim</button>
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
            </div>
          </div>
        </div>
      )}

{isEditing && (
        <EditForm
          fields={fields}
          initialValues={{ patrimonio, modelo, marca, dataCompra, descrTec }}
          onSubmit={handleEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}

export default EquipamentoCard;
