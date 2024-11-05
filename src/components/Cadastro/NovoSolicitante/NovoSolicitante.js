import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoSolicitante = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [senhaValida, setSenhaValida] = useState(true);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await api.get('/departamentos');
        setDepartamentos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      }
    };
    fetchDepartamentos();
  }, []);

  const campos = [
    { label: 'Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' },
    { label: 'ID de Acesso Remoto', name: 'id_acesso_remoto', type: 'text' },
    {
      label: 'Departamento', name: 'departamento', type: 'select', options: departamentos
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .map(dep => {
          return { label: dep.nome, value: dep.id };
        })
    },
    { label: 'Usuário', name: 'username', type: 'text' },
    { label: 'Senha', name: 'password', type: 'password', onChange: (e) => handlePasswordChange(e.target.value) }
  ]


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
    let userId; // Declara `userId` fora do bloco `try` para que fique disponível no `catch`

    try {
      // Criar o usuário primeiro para obter o ID
      const userPayload = {
        username: formData.username,
        password: formData.password,
      };

      const userResponse = await api.post('/user/solicitante', userPayload);
      userId = userResponse.data.id; // Atribui o ID retornado à variável `userId`

      if (!userId) {
        throw new Error('ID do usuário não retornado pelo backend');
      }

      // Depois, criar o solicitante usando o ID do usuário
      const solicitantePayload = {
        nome: formData.nome,
        fone: formData.fone,
        id_acesso_remoto: formData.id_acesso_remoto,
        departamento: { id: formData.departamento },
        user: { id: userId },
      };

      await api.post('/solicitantes', solicitantePayload);

      console.log('Solicitante e usuário criados com sucesso:', solicitantePayload, userPayload);
    } catch (error) {
      console.error('Erro ao criar o solicitante ou usuário:', error);

      // Em caso de erro na criação do solicitante, excluir o usuário criado para manter a integridade
      if (userId) {
        await api.delete(`/user/${userId}`);
      }
    }
  };




  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Solicitante</h1>
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/solicitantes" isSubmitDisabled={!senhaValida}
          mostrarRequisitosSenha={true} />
      </main>
    </div>
  );
};

export default NovoSolicitante;