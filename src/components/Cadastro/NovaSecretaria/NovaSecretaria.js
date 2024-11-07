import React, {useState} from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovaSecretaria = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const campos = [
    { label: '*Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    setErrorMessage('');

    if (!formData.nome) {
      return { error: 'Preencha todos os campos obrigatórios.' };
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (formData.fone && !telefoneRegex.test(formData.fone)) {
      return { error: 'O fone cadastrado é inválido.' };
    }

    try {
      const response = await api.get(`/secretarias?nome=${formData.nome}`);
      const secretariaExists = response.data.some((sec) => sec.nome === formData.nome);

      if (secretariaExists) {
        return { error: 'Já existe uma secretaria cadastrada com esse nome.' };
      }

      await api.post('/secretarias', formData);
      return {};
    } catch (error) {
      return { error: 'Ocorreu um erro ao criar a secretaria. Tente novamente.' };
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Nova Secretaria</h1>
        <Formulario campos={campos} 
        onSubmit={async (formData) => {
          const result = await handleFormSubmit(formData);
          if (result.error) {
            setErrorMessage(result.error);
          }
          return result;
        }} 
        voltarUrl="/secretarias" 
        errorMessage={errorMessage}/>
      </main>
    </div>
  );
};

export default NovaSecretaria;