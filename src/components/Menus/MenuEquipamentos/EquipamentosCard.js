import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm';
import styles from './EquipamentosCard.module.css';

function EquipamentoCard({ idEquip, num_patrimonio, modelo, marca, data_aquisicao, descr_tec, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDepartmentChangeModalOpen, setIsDepartmentChangeModalOpen] = useState(false); // Novo estado para o modo de alteração de departamento
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [newDataAquisicao, setNewDataAquisicao] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/equipamentos/${idEquip}`);
      if (onDelete) {
        onDelete(idEquip);
      }
      closeModal();
    } catch (error) {
      setErrorMessage('Não é possível excluir este técnico, pois está associado a outros registros.');
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      const payload = {
        num_patrimonio: updatedData.num_patrimonio,
        modelo: updatedData.modelo,
        marca: updatedData.marca,
        data_aquisicao: updatedData.data_aquisicao,
        descr_tec: updatedData.descr_tec,
      };
      await api.put(`/equipamentos/${idEquip}`, payload);
      if (onEdit) {
        onEdit(null);
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
    { name: 'descr_tec', label: 'Descrição Técnica', type: 'text' }
  ];

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await api.get('/departamentos');
        setDepartamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      }
    };

    if (isDepartmentChangeModalOpen) {
      fetchDepartamentos();
    }
  }, [isDepartmentChangeModalOpen]);

  const handleChangeDepartmentClick = () => {
    setIsDepartmentChangeModalOpen(true);
  };

  const closeDepartmentChangeModal = () => {
    setIsDepartmentChangeModalOpen(false); 
  };

  const handleSaveDepartmentChange = async () => {
    try {
      await api.put(`/equipamentos/${idEquip}/alterar-departamento`, {
        novoDepartamentoId: selectedDepartamento,
        novaDataAquisicao: newDataAquisicao,
      });
      setIsDepartmentChangeModalOpen(false);
      if (onEdit) {
        onEdit(null);
      }
    } catch (error) {
      console.error('Erro ao alterar departamento:', error);
    }
  };

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
              <p>Descrição Técnica: {descr_tec}</p>
            </div>
            <div className={styles.cardSideSection}>
              <p className={styles.descrTec}>Data de Aquisição: {data_aquisicao}</p>
              <button onClick={handleChangeDepartmentClick} className={styles.changeButton} aria-label="Alterar Departamento">Alterar Departamento</button>
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
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
              <button onClick={handleConfirmDelete} className={styles.confirmButton}>Sim</button>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          </div>
        </div>
      )}

      {isDepartmentChangeModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Alterar Departamento</h2>
            <label htmlFor="departamento">Novo Departamento:</label>
            <select
              id="departamento"
              value={selectedDepartamento}
              onChange={(e) => setSelectedDepartamento(e.target.value)}
            >
              <option value="">Selecione um departamento</option>
              {departamentos
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.nome}
                </option>
              ))}
            </select>

            <label htmlFor="dataAquisicao">Nova Data de Aquisição:</label>
            <input
              type="date"
              id="dataAquisicao"
              value={newDataAquisicao}
              onChange={(e) => setNewDataAquisicao(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button onClick={closeDepartmentChangeModal} className={styles.cancelButton}>Cancelar</button>
              <button onClick={handleSaveDepartmentChange} className={styles.confirmButton}>Salvar</button>
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
