import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Cabecalho from '../Cabecalho/Cabecalho';
import styles from '../Cadastro/Novo.module.css';

const SolicitarOS = () => {
  const navigate = useNavigate();
  const [solicitanteId, setSolicitanteId] = useState(null);
  const [quantidadeEquipamentos, setQuantidadeEquipamentos] = useState(1);
  const [equipamentosSelecionados, setEquipamentosSelecionados] = useState([]);
  const [opcoesEquipamentos, setOpcoesEquipamentos] = useState([]);
  const [descricao, setDescricao] = useState("");


  // Função para obter o nome do solicitante a partir do token JWT
  useEffect(() => {
    const getSolicitanteNomeFromToken = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const token = authToken.replace('Bearer ', '');
          const decoded = jwtDecode(token);
          console.log('Decoded token:', decoded);

          const userId = decoded.jti;
          console.log('User ID:', userId);

          // Buscar informações do solicitante com base no ID do usuário
          const response = await api.get(`/solicitantes/usuario/${userId}`);
          console.log('Solicitante response:', response.data);
          setSolicitanteId(response.data.id); // Armazena o nome do solicitante

          // Carregar equipamentos disponíveis no departamento do solicitante
          const deptResponse = await api.get(`/solicitantes/${response.data.id}`);
          const departamentoId = deptResponse.data.departamento.id;
          const equipResponse = await api.get(`/equipamentos/departamento/${departamentoId}`);
          setOpcoesEquipamentos(equipResponse.data);

        } catch (error) {
          console.error('Erro ao buscar o nome do solicitante:', error);
        }
      }
    };

    getSolicitanteNomeFromToken();
  }, []);

  const handleQuantidadeChange = (e) => {
    const qtd = parseInt(e.target.value);
    setQuantidadeEquipamentos(qtd);
    setEquipamentosSelecionados(Array(qtd).fill(''));
  };

  const handleEquipamentoChange = (index, value) => {
    const updatedEquipamentos = [...equipamentosSelecionados];
    updatedEquipamentos[index] = value;
    setEquipamentosSelecionados(updatedEquipamentos);
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!solicitanteId) {
      console.error('ID do solicitante não está definido.');
      return;
    }
    if (equipamentosSelecionados.some(equip => !equip)) {
      console.error('Todos os equipamentos devem ser selecionados.');
      return;
    }

    const osData = {
      descricao,
      cod_sol: solicitanteId,
      status: 'EM_ABERTO',
      tipo_chamado: 'MANUTENÇÃO',
      prioridade: 'Baixa',
      data_abertura: new Date(),
      equipamentosIds: equipamentosSelecionados
    };

    try {
      const response = await api.post('/osmenu', osData);
      navigate('/minhas-solicitacoes');
      console.log('Ordem de Serviço criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar a Ordem de Serviço:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Solicitar OS</h1>
      <div className={styles.formContainer}> 
        <form onSubmit={handleFormSubmit}>
          <div className={styles.formGroup}>
            <label>Descrição</label>
            <textarea
              value={descricao}
              onChange={handleDescricaoChange}
              placeholder="Descreva o problema ou solicitação..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Quantidade de Equipamentos:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={quantidadeEquipamentos}
              onChange={handleQuantidadeChange}
            />
          </div>

          {[...Array(quantidadeEquipamentos)].map((_, index) => (
            <div key={index} className={styles.formGroup}>
              <label>Equipamento {index + 1}:</label>
              <select
                value={equipamentosSelecionados[index] || ''}
                onChange={(e) => handleEquipamentoChange(index, e.target.value)}
              >
                <option value="">Selecione o equipamento</option>
                {opcoesEquipamentos.map(equip => (
                  <option key={equip.id} value={equip.id}>{equip.num_patrimonio}</option>
                ))}
              </select>
            </div>
          ))}

          <div className={styles.formButtons}>
            <Link className={styles.linkBtn} to="/minhas-solicitacoes">
              <button type="button" className={styles.btnBack}>Voltar</button>
            </Link>
            <button type="submit" className={styles.btnSubmit}>Salvar</button>
          </div>
        </form>
        </div>
      </main>
    </div>
  );
};

export default SolicitarOS;