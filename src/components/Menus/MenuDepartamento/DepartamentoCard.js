import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm';
import styles from './DepartamentoCard.module.css';

function DepartamentoCard({ id, nome, fone, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/departamentos/${id}`);
      if (onDelete) {
        onDelete(id);
      }
      closeModal();
    } catch (error) {
      setErrorMessage('Não é possível excluir este departamento, pois está associado a outros registros.');
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
      const response = await api.get(`/departamentos?nome=${updatedData.nome}`);
      const departamentoExists = response.data.some((dep) => dep.nome === updatedData.nome);

      if (departamentoExists) {
        setErrorMessage ('Já existe um departamento cadastrado com esse nome.');
      }

      await api.put(`/departamentos/${id}`, updatedData);
      if (onEdit) {
        onEdit(updatedData)
      }
      setIsEditing(false);
      setErrorMessage('');
    } catch (error) {
      console.error("Erro ao atualizar departamento: ", error);
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
            <div className={styles.cardSideSection}>
              <Link to={`/departamentos/${id}/equipamentos`}>
                <button className={styles.cardButton} aria-label="Equipamentos">Equipamentos</button>
              </Link>
              <Link to={`/departamentos/${id}/infoInternet`}>
                <button className={styles.cardButton} aria-label="Informações de Internet">Informações de Internet</button>
              </Link>
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
            <p>Tem certeza que deseja excluir o {nome}?</p>
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

export default DepartamentoCard;
