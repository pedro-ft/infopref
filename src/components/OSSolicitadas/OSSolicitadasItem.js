import React, { useEffect, useState } from 'react';
import api from '../../api/api';
// import { getAllTecnicos } from '../../api/tecnico';
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
      const response = await api.get('/tecnicos'); // Verifique se a URL está correta
      return response; // Retorna a resposta completa
    } catch (error) {
      console.error('Erro ao buscar técnicos:', error);
      throw error; // Lança o erro para que possa ser tratado onde a função for chamada
    }
  };

  useEffect(() => {
    if (isAcceptModalOpen) {
      const fetchTecnicos = async () => {
        try {
          const response = await getAllTecnicos();
          setTecnicos(response.data);
          console.log('Tecnicos buscados:', response.data); // Verifique a lista de técnicos
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
      // Busca a ordem de serviço atual
      const response = await api.get(`/osmenu/${id}`);
      const ordemServicoAtual = response.data;

      // Atualiza os campos necessários
      const updatedOrdemServico = {
        ...ordemServicoAtual,  // Spread para manter os dados atuais
        cod_tec: tecnicoSelecionado,
        prioridade,
        tipo_chamado: tipoChamado,
        status: "EM_ANDAMENTO"
      };

      console.log("Ordem de Serviço atualizada:", updatedOrdemServico); // Adicione isto para depuração

      // Envia a atualização
      await updateOrdemServico(updatedOrdemServico);
      closeAcceptModal();

      if (onUpdate) {
        onUpdate(id);  // Atualiza a lista de ordens se necessário
      }
    } catch (error) {
      console.error('Erro ao aceitar a ordem de serviço:', error);
    }
  };


  const updateOrdemServico = async (ordemServico) => {
    return await api.put(`/osmenu/${ordemServico.id}`, ordemServico);  // URL correta para a atualização
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
      await await api.delete(`/osmenu/${id}`);  // Chame a função para excluir a ordem
      console.log("Ordem Removida")
      if (onDelete) {
        onDelete(id);  // Atualize a lista após exclusão
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
              console.log("Técnico selecionado:", e.target.value); // Adicione isto para depuração
            }}>

              <option value="">Selecione o técnico responsável</option> {/* Adicione uma opção padrão */}
              {Array.isArray(tecnicos) && tecnicos
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map(tecnico => (
                <option key={tecnico.id} value={tecnico.id}>{tecnico.nome}</option>
              ))}
            </select>

            <label>Prioridade</label>
            <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
              <option value="">Selecione uma prioridade</option> {/* Adicione uma opção padrão */}
              <option value="Baixa">Baixa</option>
              <option value="Normal">Normal</option>
              <option value="Urgente">Urgente</option>
            </select>

            <label>Tipo de Chamado</label>
            <input type="text" value={tipoChamado} onChange={(e) => setTipoChamado(e.target.value)} />

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
