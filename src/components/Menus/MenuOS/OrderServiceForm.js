import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import styles from './OrderServiceForm.module.css';

function OrderServiceForm({ order, onClose, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(order);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States para armazenar dados do banco de dados
  const [solicitantes, setSolicitantes] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [statusList, setStatusList] = useState([]);

  // Função para buscar dados do banco de dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const solicitantesRes = await api.get('/solicitantes');
        const tecnicosRes = await api.get('/tecnicos');


        setSolicitantes(solicitantesRes.data);
        setPrioridades(["Baixa", "Normal", "Urgente"]);
        setTecnicos(tecnicosRes.data);
        setStatusList([{ key: "Aguardando peças", value: "AGUARDANDO_PEÇAS" }, { key: "Em andamento", value: "EM_ANDAMENTO" }, { key: "Finalizado", value: "FINALIZADO" }]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

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

  // Função para realizar a atualização da ordem de serviço
  const updateOrderService = async () => {
    try {
      setIsSubmitting(true);
      await api.put(`/osmenu/${formData.id}`, formData);
      alert('Ordem de Serviço atualizada com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar a Ordem de Serviço:', error);
      alert('Houve um erro ao tentar atualizar a Ordem de Serviço.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ordem de Serviço Atualizada:', formData);
    updateOrderService();
    onClose();
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="requester">Nome Solicitante</label>
              <select
                id="requester"
                name="requester"
                value={formData.requester}
                onChange={handleChange}
              >
                {solicitantes.map((solicitante) => (
                  <option key={solicitante.id} value={solicitante.id}>
                    {solicitante.nome}
                  </option>
                ))}
              </select>
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
                  {prioridades.map(prio => {
                    return <option key={prio} value={prio}>{prio}</option>
                  })}
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
                  {tecnicos.map((tecnico) => (
                    <option key={tecnico.id} value={tecnico.id}>
                      {tecnico.nome}
                    </option>
                  ))}
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
                  {statusList.map(stat => {
                    return <option key={stat.key} value={stat.value}>{stat.key}</option>
                  })}
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
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </button>
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
