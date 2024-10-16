import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import styles from './OrderServiceForm.module.css';

function OrderServiceForm({ order, onClose, onDelete, onSave }) {
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
        setStatusList([
          { key: "Aguardando peças", value: "AGUARDANDO_PEÇAS" },
          { key: "Em andamento", value: "EM_ANDAMENTO" },
          { key: "Finalizado", value: "FINALIZADO" }
        ]);

        if (order) {
          const updatedData = {
            ...order,
            // Aqui apenas utilize os valores de cod_sol e cod_tec diretamente do order
            cod_sol: order.cod_sol,
            cod_tec: order.cod_tec,
          };
          console.log("Updated formData:", updatedData);
          setFormData(updatedData);
        }

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [order]);





  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteOrderService();
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing field: ${name}, Value: ${value}`);
    setFormData({ ...formData, [name]: value });
  };


  // Função para realizar a atualização da ordem de serviço
  const updateOrderService = async () => {
    try {
      setIsSubmitting(true);

      await api.put(`/osmenu/${formData.id}`, formData);
      //alert('Ordem de Serviço atualizada com sucesso!');
      if (onSave) {
        onSave(); // Notifica a página principal para recarregar a lista
      }
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar a Ordem de Serviço:', error);
      alert('Houve um erro ao tentar atualizar a Ordem de Serviço.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteOrderService = async () => {
    try {
      await api.delete(`/osmenu/${formData.id}`);
      //alert('Ordem de Serviço excluída com sucesso!');
      if (onDelete) {
        onDelete(); // Notifica a página principal para remover a ordem da lista
      }
    } catch (error) {
      console.error('Erro ao excluir a Ordem de Serviço:', error);
      alert('Houve um erro ao tentar excluir a Ordem de Serviço.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ordem de Serviço Atualizada:', formData);
    updateOrderService();
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="cod_sol">Nome Solicitante</label>
              <select
                id="cod_sol"
                name="cod_sol"
                value={formData.cod_sol}
                onChange={handleChange}
              >
                {solicitantes.map((solicitante) => {
                  console.log("Solicitante Option:", solicitante);
                  return (
                    <option key={solicitante.id} value={solicitante.id}>
                      {solicitante.nome}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="num_patrimonio">Número de Patrimônio</label>
              <input
                type="number"
                id="num_patrimonio"
                name="num_patrimonio"
                value={formData.num_patrimonio}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="tipo_chamado">Tipo Chamado</label>
                <input
                  type='text'
                  id="tipo_chamado"
                  name="tipo_chamado"
                  value={formData.tipo_chamado}
                  onChange={handleChange}
                >
                </input>
              </div>
            </div>


            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="prioridade">Prioridade</label>
                <select
                  id="prioridade"
                  name="prioridade"
                  value={formData.prioridade}
                  onChange={handleChange}
                >
                  {prioridades.map(prio => {
                    return <option key={prio} value={prio}>{prio}</option>
                  })}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cod_tec">Técnico</label>
                <select
                  id="cod_tec"
                  name="cod_tec"
                  value={formData.cod_tec}
                  onChange={handleChange}
                >
                  {tecnicos.map((tecnico) => {
                    console.log("Técnico Option:", tecnico);
                    return (
                      <option key={tecnico.id} value={tecnico.id}>
                        {tecnico.nome}
                      </option>
                    );
                  })}
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
                <label htmlFor="data_finalizacao">Data Finalização</label>
                <input
                  type="date"
                  id="data_finalizacao"
                  name="data_finalizacao"
                  value={formData.data_finalizacao}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                rows="3"
                value={formData.descricao}
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
