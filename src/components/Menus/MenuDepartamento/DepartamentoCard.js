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
      console.log("Departamento removido");
      if (onDelete) {
        onDelete(id);
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao deletar departamento: ", error);

      // Aqui estamos tentando obter uma mensagem de erro do corpo da resposta
      const errorMsg = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Erro ao tentar excluir o departamento.';

      // Verifica se o erro indica que a exclusão não foi permitida
      if (error.response && error.response.status === 409) { // Verifica se o status é 409
        setErrorMessage('Não é possível excluir este departamento, pois está associado a outros registros.');
      } else {
        setErrorMessage(errorMsg);
      }
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      console.log('Dados enviados para o servidor:', updatedData);
      await api.put(`/departamentos/${id}`, updatedData);
      console.log('Objeto editado:', updatedData);
      if (onEdit) {
        onEdit(updatedData)
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar departamento: ", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
              <button onClick={handleConfirmDelete} className={styles.confirmButton}>Sim</button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <EditForm
          fields={fields}
          initialValues={{ nome, fone }}
          onSubmit={(updatedData) => handleEdit({ ...updatedData, id })}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}

export default DepartamentoCard;
