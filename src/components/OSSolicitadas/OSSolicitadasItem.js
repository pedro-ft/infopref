import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import styles from './OSSolicitadasItem.module.css';

function OSSolicitadasItem({ id, dataAbertura, patrimonio, solicitante, secretaria, departamento, descricao, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [tipoChamado, setTipoChamado] = useState('');

  const getAllTecnicos = async () => {
    try {
      const response = await api.get('/tecnicos');
      return response;
    } catch (error) {
      console.error('Erro ao buscar técnicos:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (isAcceptModalOpen) {
      const fetchTecnicos = async () => {
        try {
          const response = await getAllTecnicos();
          setTecnicos(response.data);
          console.log('Tecnicos buscados:', response.data);
        } catch (error) {
          console.error('Erro ao buscar técnicos:', error);
        }
      };

      fetchTecnicos();
    }
  }, [isAcceptModalOpen]);

  const handleAccept = async () => {
    setIsAcceptModalOpen(true);
  };

  const handleConfirmAccept = async () => {
    try {
      const response = await api.get(`/osmenu/${id}`);
      const ordemServicoAtual = response.data;

      const updatedOrdemServico = {
        ...ordemServicoAtual,
        cod_tec: tecnicoSelecionado,
        prioridade,
        tipo_chamado: tipoChamado,
        status: "EM_ANDAMENTO",
        equipamentoPatrimonio: Array.isArray(ordemServicoAtual.equipamentoPatrimonio)
          ? ordemServicoAtual.equipamentoPatrimonio.join(", ")
          : ordemServicoAtual.equipamentoPatrimonio
      };

      await updateOrdemServico(updatedOrdemServico);
      closeAcceptModal();

      if (onUpdate) {
        onUpdate(id);
      }
    } catch (error) {
      console.error('Erro ao aceitar a ordem de serviço:', error);
    }
  };


  const updateOrdemServico = async (ordemServico) => {
    if (Array.isArray(ordemServico.equipamentoPatrimonio)) {
      ordemServico.equipamentoPatrimonio = ordemServico.equipamentoPatrimonio.join(', ');
    }

    return await api.put(`/osmenu/${ordemServico.id}`, ordemServico);
  };


  const closeAcceptModal = () => {
    setIsAcceptModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await await api.delete(`/osmenu/${id}`);
      if (onDelete) {
        onDelete(id);
      }
      closeModal();
    } catch (error) {
      console.error('Erro ao rejeitar a ordem de serviço:', error);
    }
  };




  return (
    <>
      <article className={styles.card}>
        <img src={"/imagens/ordem.svg"} alt={`OS avatar`} className={styles.avatar} />
        <div className={styles.cardContent}>
          <div className={styles.cardDetails}>
            <div className={styles.info}>
              <p>Data Abertura: {dataAbertura}</p>
              <p>Nº de patrimônio: {patrimonio}</p>
              <p>Descrição: {descricao}</p>
            </div>
            <div className={styles.cardSideSection}>
              <p className={styles.descrTec}>Solicitante: {solicitante}</p>
              <p className={styles.descrTec}>Secretaria: {secretaria}</p>
              <p className={styles.descrTec}>Departamento: {departamento}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.botaoAceitar} onClick={handleAccept} aria-label="Aceitar">
                Aceitar
              </button>
              <button className={styles.botaoRejeitar} onClick={openModal} aria-label="Rejeitar">
                Rejeitar
              </button>
            </div>
          </div>
        </div>
      </article>

      {isAcceptModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Aceitar Ordem de Serviço</h2>
            <p>Selecione as informações abaixo:</p>

            <label>Técnico</label>
            <select value={tecnicoSelecionado} onChange={(e) => {
              setTecnicoSelecionado(e.target.value);
            }}>

              <option value="">Selecione o técnico responsável</option>
              {Array.isArray(tecnicos) && tecnicos
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map(tecnico => (
                  <option key={tecnico.id} value={tecnico.id}>{tecnico.nome}</option>
                ))}
            </select>

            <label>Prioridade</label>
            <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
              <option value="">Selecione uma prioridade</option>
              <option value="Baixa">Baixa</option>
              <option value="Normal">Normal</option>
              <option value="Urgente">Urgente</option>
            </select>

            <label>Tipo de Chamado</label>
            <select value={tipoChamado} onChange={(e) => setTipoChamado(e.target.value)}>
              <option value="">Selecione uma tipo de chamado</option>
              <option value="HARDWARE">Hardware</option>
              <option value="SOFTWARE">Software</option>
              <option value="REDE">Rede</option>
              <option value="SEGURANCA">Segurança</option>
              <option value="SUPORTE_GERAL">Suporte Geral</option>
              <option value="MANUTENCAO_PREVENTIVA">Manutenção Preventiva</option>
            </select>

            <div className={styles.modalActions}>
              <button onClick={closeAcceptModal} className={styles.cancelButton}>Cancelar</button>
              <button onClick={handleConfirmAccept} className={styles.confirmButton}>Aceitar</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Rejeição</h2>
            <p>Tem certeza que deseja rejeitar essa Ordem de Serviço?</p>
            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
              <button onClick={handleConfirmDelete} className={styles.confirmButton}>Sim</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OSSolicitadasItem;
