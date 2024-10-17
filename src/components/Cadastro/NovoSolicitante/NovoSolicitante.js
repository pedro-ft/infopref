import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoSolicitante = () => {

  const [departamentos, setDepartamentos] = useState([]);

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
    { label: 'Senha', name: 'password', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    try {
      const userPayload = {
        username: formData.username,
        password: formData.password,
      };

      const userResponse = await api.post('/user/solicitante', userPayload);
      const userId = userResponse.data.id;

      if (!userId) {
        throw new Error('ID do usuário não retornado pelo backend');
      }

      const solicitantePayload = {
        nome: formData.nome,
        fone: formData.fone,
        id_acesso_remoto: formData.id_acesso_remoto,
        departamento: { id: formData.departamento },
        user: { id: userId },
      };

      console.log('Payload do solicitante:', solicitantePayload);
      await api.post('/solicitantes', solicitantePayload);
      console.log('Solicitante criado com sucesso:', solicitantePayload);
    } catch (error) {
      console.error('Erro ao criar o solicitante ou usuário:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Solicitante</h1>
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/solicitantes" />
      </main>
    </div>
  );
};

export default NovoSolicitante;