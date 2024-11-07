import React, { useState } from 'react';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm';
import styles from './TecnicoCard.module.css';

function TecnicoCard({ id, nome, fone, onDelete, onEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchDetails = async (tecnicoId) => {
    try {
      const response = await api.get(`/tecnicos/${tecnicoId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do técnico:', error);
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const tecnicoDetails = await fetchDetails(id);

      if (tecnicoDetails && tecnicoDetails.user && tecnicoDetails.user.id) {
        const userId = tecnicoDetails.user.id;

        await api.delete(`/tecnicos/${id}`);

        await api.delete(`/user/${userId}`);
      } else {
        console.error("Nenhum usuário associado encontrado para o técnico");
      }

      if (onDelete) {
        onDelete(id);
      }
      closeModal();
    } catch (error) {
      setErrorMessage('Não é possível excluir este técnico, pois está associado a outros registros.');
    }
  };


  const handleEdit = async (updatedData) => {
    if (!updatedData.nome) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }
    // Remove qualquer formatação para o envio ao backend
    const rawPhone = updatedData.fone.replace(/\D/g, '');
    updatedData.fone = rawPhone;

    try {
      await api.put(`/tecnicos/${id}`, updatedData);

      if (onEdit) {
        onEdit({ ...updatedData, fone: formatPhoneNumber(rawPhone) });
      }
      setIsEditing(false);
      setErrorMessage('');
    } catch (error) {
      console.error("Erro ao atualizar tecnico: ", error);
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

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return number;
  };

  return (
    <>
      <article className={styles.card}>
        <img src="/imagens/tecnico.svg" alt={`${nome}'s avatar`} className={styles.avatar} />
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.name}>Nome: {nome}</h3>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.info}>
              <p>Fone: {formatPhoneNumber(fone)}</p>
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
            <p>Tem certeza que deseja excluir o técnico {nome}?</p>
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
          initialValues={{ nome, fone: formatPhoneNumber(fone) }}
          onSubmit={(updatedData) => handleEdit({ ...updatedData, id })}
          onCancel={handleCancelEdit}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}

export default TecnicoCard;