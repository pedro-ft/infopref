import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Cabecalho from '../Cabecalho/Cabecalho';
import Formulario from '../Cadastro/Formulario/Formulario';
import styles from '../Cadastro/Novo.module.css';

const SolicitarOS = () => {

  const [solicitanteId, setSolicitanteId] = useState(null);
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
        } catch (error) {
          console.error('Erro ao buscar o nome do solicitante:', error);
        }
      }
    };

    getSolicitanteNomeFromToken();
  }, []);

  const campos = [
    { label: 'Número de Patrimônio', name: 'num_patrimonio', type: 'number' },
    { label: 'Descrição', name: 'descricao', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    if (!solicitanteId) {
      console.error('Nome do solicitante não está definido.');
      return;
    }
    const osData = {
      num_patrimonio: formData.num_patrimonio,
      descricao: formData.descricao,
      cod_sol: solicitanteId, // Inclui o nome do solicitante no payload
      status: 'EM_ABERTO',              // Status padrão
      tipo_chamado: 'MANUTENÇÃO',    // Tipo de chamado padrão
      prioridade: 'Baixa',           // Prioridade padrão
      data_abertura: new Date()     // Data de abertura
      //data_finalizacao: new Date()        // Data de finalização indefinida no início
    };

    try {
      const response = await api.post('/osmenu', osData); // Endpoint para criar nova OS
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
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/minhas-solicitacoes" />
      </main>
    </div>
  );
};

export default SolicitarOS;