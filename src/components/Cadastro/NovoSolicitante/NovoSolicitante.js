import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoSolicitante = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [senhaValida, setSenhaValida] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await api.get('/departamentos');
        setDepartamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      }
    };
    fetchDepartamentos();
  }, []);

  const campos = [
    { label: '*Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' },
    { label: 'ID de Acesso Remoto', name: 'id_acesso_remoto', type: 'text' },
    {
      label: '*Departamento', name: 'departamento', type: 'select', options: departamentos
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .map(dep => {
          return { label: dep.nome, value: dep.id };
        })
    },
    { label: '*Usuário', name: 'username', type: 'text' },
    { label: '*Senha', name: 'password', type: 'password', onChange: (e) => handlePasswordChange(e.target.value) }
  ]


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
    let userId;
    setErrorMessage('');

    if (!formData.nome || !formData.username || !formData.password || !formData.departamento) {
      return { error: 'Preencha todos os campos obrigatórios.' };
    }

    if (formData.username.length < 3 || formData.username.length > 30) {
      return { error: 'O usuário deve possuir entre 3 e 30 caracteres.' };
    }

    if (!isPasswordValid(formData.password)) {
      return { error: 'A senha não atende aos requisitos.' };
    }

    // Remove todos os caracteres não numéricos do telefone antes de salvar
    const telefoneSomenteNumeros = formData.fone ? formData.fone.replace(/\D/g, '') : '';

    // Valida o telefone apenas se ele não estiver vazio
    if (telefoneSomenteNumeros && (telefoneSomenteNumeros.length < 10 || telefoneSomenteNumeros.length > 11)) {
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

      const userResponse = await api.post('/user/solicitante', userPayload);
      userId = userResponse.data.id;

      const solicitantePayload = {
        nome: formData.nome,
        fone: telefoneSomenteNumeros || null,
        id_acesso_remoto: formData.id_acesso_remoto,
        departamento: { id: formData.departamento },
        user: { id: userId },
      };

      await api.post('/solicitantes', solicitantePayload);
      return {};
    } catch (error) {
      // Exibe mensagem de erro
      setErrorMessage('Ocorreu um erro ao criar o técnico. Tente novamente.');

      // Exclui o usuário criado, se o ID existir
      if (userId) {
        try {
          await api.delete(`/user/${userId}`);
        } catch (deleteError) {
          console.error("Erro ao excluir o usuário:", deleteError);
        }
      }
      return { error: 'Ocorreu um erro ao criar o técnico. Tente novamente.' };
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Solicitante</h1>
        <Formulario campos={campos}
          onSubmit={async (formData) => {
            const result = await handleFormSubmit(formData);
            if (result.error) {
              setErrorMessage(result.error);
            }
            return result;
          }}
          voltarUrl="/solicitantes"
          isSubmitDisabled={!senhaValida}
          mostrarRequisitosSenha={true}
          errorMessage={errorMessage} />
      </main>
    </div>
  );
};

export default NovoSolicitante;