import React, { useState } from 'react';
import styles from './OrderServiceForm.module.css';

function OrderServiceForm({ order, onClose, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(order);

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
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ordem de Serviço Atualizada:', formData);
    onClose();
  };

  return (
    <>
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="requester">Nome Solicitante</label>
            <input 
              type="text" 
              id="requester" 
              name="requester" 
              value={formData.requester} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="patrimonio">Número de Patrimônio</label>
            <input 
              type="number" 
              id="patrimonio" 
              name="patrimonio" 
              value={formData.patrimonio} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="secretariat">Secretaria</label>
            <select 
              id="secretariat" 
              name="secretariat" 
              value={formData.secretariat} 
              onChange={handleChange}
            >
              <option value="Administração">Administração</option>
              <option value="Financeiro">Financeiro</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="department">Departamento</label>
            <select 
              id="department" 
              name="department" 
              value={formData.department} 
              onChange={handleChange}
            >
              <option value="Administração">Administração</option>
              <option value="RH">RH</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tipoChamado">Tipo Chamado</label>
            <select 
              id="tipoChamado" 
              name="tipoChamado" 
              value={formData.tipoChamado} 
              onChange={handleChange}
            >
              <option value="Troca de Peças">Troca de Peças</option>
              <option value="Manutenção">Manutenção</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
          </div>
          </div>

        
          <div className={styles.formRow}> 
          <div className={styles.formGroup}>
            <label htmlFor="priority">Prioridade</label>
            <select 
              id="priority" 
              name="priority" 
              value={formData.priority} 
              onChange={handleChange}
            >
              <option value="Urgente">Urgente</option>
              <option value="Normal">Normal</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tecnico">Técnico</label>
            <select 
              id="tecnico" 
              name="tecnico" 
              value={formData.tecnico} 
              onChange={handleChange}
            >
              <option value="Leonardo Mulinari">Leonardo Mulinari</option>
              <option value="Pedro Ferreira Taborda">Pedro Ferreira Taborda</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select 
              id="status" 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
            >
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Aguardando">Aguardando</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
          </div>
          </div>

          <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="closeDate">Data Finalização</label>
            <input 
              type="date" 
              id="closeDate" 
              name="closeDate" 
              value={formData.closeDate} 
              onChange={handleChange} 
            />
          </div>
        </div>  
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea 
              id="description" 
              name="description" 
              rows="3" 
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="resolucao">Resolução</label>
            <textarea 
              id="resolucao" 
              name="resolucao" 
              rows="3" 
              value={formData.resolucao} 
              onChange={handleChange} 
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>Salvar</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancelar</button>
            <button type="button" className={styles.deleteButton} onClick={openModal}>Excluir Ordem</button>
          </div>
        </form>
      </div>
    </div>
    {isModalOpen && (
        <div className={styles.modalOverlay2}>
          <div className={styles.modalContent2}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir a Ordem de Serviço {formData.id}?</p>
            <div className={styles.modalActions2}>
              <button onClick={handleConfirmDelete} className={styles.confirmButton2}>Sim</button>
              <button onClick={closeModal} className={styles.cancelButton2}>Não</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderServiceForm;
