import React, { useState } from 'react';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm';
import styles from './EquipamentosCard.module.css';

function EquipamentoCard({ idEquip, num_patrimonio, modelo, marca, data_aquisicao, descr_tec, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  console.log(idEquip);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/equipamentos/${idEquip}`); // Use o id recebido
      console.log("equipamento removido");
      if (onDelete) {
        onDelete(idEquip); // Chama onDelete para atualizar a lista, caso necessário
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao deletar equipamento: ", error);
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      console.log('Dados enviados para o servidor:', updatedData);
      const payload = {
        num_patrimonio: updatedData.num_patrimonio, // Certifique-se de usar o nome correto
        modelo: updatedData.modelo,
        marca: updatedData.marca,
        data_aquisicao: updatedData.data_aquisicao, // Certifique-se de usar o nome correto
        descr_tec: updatedData.descr_tec,
      };
      await api.put(`/equipamentos/${idEquip}`, payload);
      console.log('Objeto editado:', payload);
      if (onEdit) {
        onEdit({ ...updatedData, idEquip })
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar equipamento: ", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const fields = [
    { name: 'modelo', label: 'Modelo', type: 'text' },
    { name: 'marca', label: 'Marca', type: 'text' },
    { name: 'data_aquisicao', label: 'Data de Aquisição', type: 'date' },
    { name: 'descr_tec', label: 'Descrição Técnica', type: 'text' },
  ];

  return (
    <>
      <article className={styles.card}>
        <img src="/imagens/Equipamentos.svg" alt={`Equipamento avatar`} className={styles.avatar} />
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.name}>Nº de Patrimônio: {num_patrimonio}</h3>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.info}>
              <p>Modelo: {modelo}</p>
              <p>Marca: {marca}</p>
              <p>Data de Aquisição: {data_aquisicao}</p>
            </div>
            <div className={styles.cardSideSection}>
              <p className={styles.descrTec}>Descrição Técnica: {descr_tec}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} aria-label="Edit" onClick={() => setIsEditing(true)}>
                <img src="/imagens/Editar.svg" alt="" />
              </button>
              <button className={styles.deleteButton} onClick={openModal} aria-label="Delete">
                <img src="/imagens/Excluir.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o equipamento {num_patrimonio}?</p>
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
          initialValues={{ num_patrimonio, modelo, marca, data_aquisicao, descr_tec }}
          onSubmit={(updatedData) => handleEdit({ ...updatedData, idEquip })}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}

export default EquipamentoCard;
