import React, { useState } from 'react';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm';
import styles from './SecretariaCard.module.css';

function SecretariaCard({ id, nome, fone, onDelete, onEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/secretarias/${id}`);
      if (onDelete) {
        onDelete(id);
      }
      closeModal();
    } catch (error) {
      setErrorMessage('Não é possível excluir esta secretaria, pois está associada a outros registros.');
    }
  };

  const handleEdit = async (updatedData) => {
    if (!updatedData.nome) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (updatedData.fone && !telefoneRegex.test(updatedData.fone)) {
      setErrorMessage('O fone cadastrado é inválido.');
      return;
    }
    try {
      const response = await api.get(`/secretarias?nome=${updatedData.nome}`);
      const secretariaExists = response.data.some((sec) => sec.nome === updatedData.nome);

      if (secretariaExists) {
        setErrorMessage('Já existe uma secretaria cadastrada com esse nome.');
        return;
      }
      
      await api.put(`/secretarias/${id}`, updatedData);

      if (onEdit) {
        onEdit(updatedData)
      }
      setIsEditing(false);
      setErrorMessage('');
    } catch (error) {
      console.error("Erro ao atualizar secretaria: ", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMessage('');
  };

  const fields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'fone', label: 'Telefone', type: 'text' },
  ];

  return (
    <>
      <article className={styles.card}>
        <img src="imagens/Secretaria.svg" alt={`${nome}'s avatar`} className={styles.avatar} />
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.name}>{nome}</h3>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.info}>
              <p>Fone: {fone}</p>
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
            <p>Tem certeza que deseja excluir a {nome}?</p>
            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
              <button onClick={handleConfirmDelete} className={styles.confirmButton}>Sim</button>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          </div>
        </div>
      )}
      {isEditing && (
        <EditForm
          fields={fields}
          initialValues={{ nome, fone }}
          onSubmit={(updatedData) => handleEdit({ ...updatedData, id })}
          onCancel={handleCancelEdit}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}

export default SecretariaCard;
