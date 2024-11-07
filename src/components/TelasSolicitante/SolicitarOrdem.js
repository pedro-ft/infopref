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
  const [descricao, setDescricao] = useState("");

  // Função para obter o ID do solicitante a partir do token JWT
  useEffect(() => {
    const getSolicitanteIdFromToken = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const token = authToken.replace('Bearer ', '');
          const decoded = jwtDecode(token);
          const userId = decoded.jti;

          // Buscar informações do solicitante com base no ID do usuário
          const response = await api.get(`/solicitantes/usuario/${userId}`);
          setSolicitanteId(response.data.id);
        } catch (error) {
          console.error('Erro ao buscar o ID do solicitante:', error);
        }
      }
    };

    getSolicitanteIdFromToken();
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
      console.error('Todos os equipamentos devem ser preenchidos.');
      return;
    }

    const osData = {
      descricao,
      cod_sol: solicitanteId,
      status: 'EM_ABERTO',
      tipo_chamado: 'HARDWARE',
      prioridade: 'Baixa',
      data_abertura: new Date(),
      equipamentoPatrimonio: equipamentosSelecionados
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
                <input
                  type="number" 
                  value={equipamentosSelecionados[index] || ''}
                  onChange={(e) => handleEquipamentoChange(index, e.target.value)}
                  placeholder="Digite o número de patrimônio"
                />
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
