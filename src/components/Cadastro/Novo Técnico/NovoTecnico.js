import React, { useState } from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoTecnico = () => {
  const [senhaValida, setSenhaValida] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
      /[A-Za-z]/.test(password) && 
      /\d/.test(password)         
    );
  };

  const handlePasswordChange = (password) => {
    setSenhaValida(isPasswordValid(password));
  };

  const handleFormSubmit = async (formData) => {
    setErrorMessage('');

    if (!formData.nome || !formData.username || !formData.password) {
      return { error: 'Preencha todos os campos obrigatórios.' };
    }

    if (formData.username.length < 3 || formData.username.length > 30) {
      return { error: 'O usuário deve possuir entre 3 e 30 caracteres.' };
    }

    if (!isPasswordValid(formData.password)) {
      return { error: 'A senha não atende aos requisitos.' };
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (formData.fone && !telefoneRegex.test(formData.fone)) {
      return { error: 'O fone cadastrado é inválido.' };
    }

    try {
      const response = await api.get(`/user?username=${formData.username}`);
      const userExists = response.data.some((user) => user.username === formData.username);

      if (userExists) {
        return { error: 'Já existe um cadastro com esse usuário.' };
      }

      const userPayload = {
        username: formData.username,
        password: formData.password,
      };

      const userResponse = await api.post('/user', userPayload);
      const userId = userResponse.data.id;

      const tecnicoPayload = {
        nome: formData.nome,
        fone: formData.fone,
        user: { id: userId },
      };

      await api.post('/tecnicos', tecnicoPayload);
      return {};
    } catch (error) {
      return { error: 'Ocorreu um erro ao criar o técnico. Tente novamente.' };
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Tecnico</h1>
        <Formulario
          campos={campos}
          onSubmit={async (formData) => {
            const result = await handleFormSubmit(formData);
            if (result.error) {
              setErrorMessage(result.error);
            }
            return result; 
          }}
          voltarUrl="/tecnicos"
          isSubmitDisabled={!senhaValida}
          mostrarRequisitosSenha={true}
          errorMessage={errorMessage}
        />
      </main>
    </div>
  );
};

export default NovoTecnico;
