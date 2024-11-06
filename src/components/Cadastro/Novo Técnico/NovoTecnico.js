import React, { useState } from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoTecnico = () => {
  const [senhaValida, setSenhaValida] = useState(true);

  const campos = [
    { label: '*Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' },
    { label: '*Usuário', name: 'username', type: 'text' },
    { label: '*Senha', name: 'password', type: 'password', onChange: (e) => handlePasswordChange(e.target.value) },
  ];

  const isPasswordValid = (password) => {
    return (
      password.length >= 5 &&
      password.length <= 20 &&
      /[A-Za-z]/.test(password) && // Verifica se há pelo menos uma letra
      /\d/.test(password)          // Verifica se há pelo menos um número
    );
  };

  const handlePasswordChange = (password) => {
    setSenhaValida(isPasswordValid(password));
  };

  const handleFormSubmit = async (formData) => {
    if (!isPasswordValid(formData.password)) {
      alert('A senha precisa atender aos requisitos.');
      return;
    }

    let userId;
    try {
      const userPayload = {
        username: formData.username,
        password: formData.password,
      };

      const userResponse = await api.post('/user', userPayload);
      userId = userResponse.data.id;

      if (!userId) {
        throw new Error('ID do usuário não retornado pelo backend');
      }

      const tecnicoPayload = {
        nome: formData.nome,
        fone: formData.fone,
        user: { id: userId },
      };

      await api.post('/tecnicos', tecnicoPayload);

      console.log('Técnico e usuário criados com sucesso:', tecnicoPayload, userPayload);
    } catch (error) {
      console.error('Erro ao criar o técnico ou usuário:', error);
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
        <Formulario
          campos={campos}
          onSubmit={handleFormSubmit}
          voltarUrl="/tecnicos"
          isSubmitDisabled={!senhaValida}
          mostrarRequisitosSenha={true}
        />


      </main>
    </div>
  );
};

export default NovoTecnico;
