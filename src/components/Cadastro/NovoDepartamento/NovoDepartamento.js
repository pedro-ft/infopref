import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoDepartamento = () => {
  const [secretarias, setSecretarias] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSecretarias = async () => {
      try {
        const response = await api.get('/secretarias');
        setSecretarias(response.data);
      } catch (error) {
        console.error('Erro ao carregar secretarias:', error);
      }
    };
    fetchSecretarias();
  }, []);

  const campos = [
    { label: '*Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' },
    {
      label: '*Secretaria',
      name: 'secretariaId',
      type: 'select',
      options: secretarias
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .map(sec => {
          return { label: sec.nome, value: sec.id };
        })
    }
  ];

  const handleFormSubmit = async (formData) => {
    setErrorMessage('');

    if (!formData.nome || !formData.secretariaId) {
      return { error: 'Preencha todos os campos obrigatórios.' };
    }

    // Remove todos os caracteres não numéricos do telefone antes de salvar
    const telefoneSomenteNumeros = formData.fone ? formData.fone.replace(/\D/g, '') : '';

    // Valida o telefone apenas se ele não estiver vazio
    if (telefoneSomenteNumeros && (telefoneSomenteNumeros.length < 10 || telefoneSomenteNumeros.length > 11)) {
      return { error: 'O fone cadastrado é inválido.' };
    }

    try {
      const response = await api.get(`/departamentos?nome=${formData.nome}`);
      const departamentoExists = response.data.some((dep) => dep.nome === formData.nome);

      if (departamentoExists) {
        return { error: 'Já existe um departamento cadastrado com esse nome.' };
      }

      // Salva o telefone sem formatação no banco de dados, mas apenas se ele foi preenchido
      await api.post('/departamentos', { ...formData, fone: telefoneSomenteNumeros || null });
      return {};
    } catch (error) {
      return { error: 'Ocorreu um erro ao criar o departamento. Tente novamente.' };
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Departamento</h1>
        <Formulario campos={campos}
          onSubmit={async (formData) => {
            const result = await handleFormSubmit(formData);
            if (result.error) {
              setErrorMessage(result.error);
            }
            return result;
          }}
          voltarUrl="/departamentos"
          errorMessage={errorMessage} />
      </main>
    </div>
  );
};

export default NovoDepartamento;