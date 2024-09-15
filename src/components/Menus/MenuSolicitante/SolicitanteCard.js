import React, { useState } from 'react';
import EditForm from '../EditForm/EditForm'
import styles from './SolicitanteCard.module.css';
import { type } from '@testing-library/user-event/dist/type';

function SolicitanteCard({ name, department, secretariat, phone, remoteAccessId, onEdit, onDelete }) {
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
    onEdit(updatedData);
    console.log('Objeto editado:', updatedData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const fields = [
    { name: 'name', label: 'Nome', type: 'text' },
    { name: 'secretariat', label: 'Secretaria', type: 'select', options: [
      { label: 'Educação e Saúde', value: 'educação e saúde' },
      { label: 'Administração', value: 'administração' },
      { label: 'Segurança Pública', value: 'segurança pública' },
    ]
  },
  { name: 'departament', label: 'Departamento', type: 'select', options: [
    { label: 'Educação', value: 'educação' },
    { label: 'Saúde', value: 'saúde' },
    { label: 'Segurança', value: 'segurança' },
  ]
},
    { name: 'phone', label: 'Telefone', type: 'text' },
    { name: 'remoteAccessId', label: 'ID de Acesso Remoto', type: 'text' },

  ];

  return (
  <>
    <article className={styles.card}>
      <img src="/imagens/Usuario.svg" alt={`${name}'s avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
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
            <button className={styles.editButton} aria-label="Edit" onClick={() => setIsEditing(true)}>
              <img src="/imagens/Editar.svg" alt="" />
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
            <p>Tem certeza que deseja excluir o solicitante {name}?</p>
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
          initialValues={{ name, phone, secretariat, department, remoteAccessId }}
          onSubmit={handleEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}

export default SolicitanteCard;