import React from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoTecnico = () => {
  const campos = [
    { label: 'Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' },
    { label: 'Usuário', name: 'username', type: 'text' },
    { label: 'Senha', name: 'password', type: 'text' },
  ]

  const handleFormSubmit = async (formData) => {
    let userId;
    try {
      // Criar o usuário primeiro para obter o ID
      const userPayload = {
        username: formData.username,
        password: formData.password,
      };

      const userResponse = await api.post('/user', userPayload);
      userId = userResponse.data.id;

      if (!userId) {
        throw new Error('ID do usuário não retornado pelo backend');
      }

      // Depois, criar o técnico usando o ID do usuário
      const tecnicoPayload = {
        nome: formData.nome,
        fone: formData.fone,
        user: { id: userId },
      };

      await api.post('/tecnicos', tecnicoPayload);

      console.log('Técnico e usuário criados com sucesso:', tecnicoPayload, userPayload);
    } catch (error) {
      console.error('Erro ao criar o técnico ou usuário:', error);

      // Em caso de erro na criação do técnico, excluir o usuário criado para manter a integridade
      if (userId) {
        await api.delete(`/user/${userId}`);
      }
    }
  };


  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Tecnico</h1>
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/tecnicos" />
      </main>
    </div>
  );
};

export default NovoTecnico;