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
    try {
      // Criar o usuário primeiro
      const userPayload = {
        username: formData.username,
        password: formData.password,
      };

      const userResponse = await api.post('/user', userPayload);
      const userId = userResponse.data.id; // Supondo que o backend retorna o ID do usuário criado

      if (!userId) {
        throw new Error('ID do usuário não retornado pelo backend');
      }

      // Criar o técnico com o cod_usuario do usuário recém-criado
      const tecnicoPayload = {
        nome: formData.nome,
        fone: formData.fone,
        user: { id: userId }, // Vincular com o usuário criado
      };


      console.log('Payload do técnico:', tecnicoPayload);
      await api.post('/tecnicos', tecnicoPayload);
      console.log('Técnico criado com sucesso:', tecnicoPayload);
    } catch (error) {
      console.error('Erro ao criar o técnico ou usuário:', error);
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