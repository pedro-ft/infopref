import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovaInfoInternet = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState('');

  const campos = [
    { label: '*Nome da Rede', name: 'nome', type: 'text' },
    { label: '*Senha', name: 'senha', type: 'text' },
    { label: 'IP', name: 'ip', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    setErrorMessage('');

    if (!formData.nome || !formData.senha) {
      return { error: 'Preencha todos os campos obrigatórios.' };
    }

    const ipRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    if (formData.ip && !ipRegex.test(formData.ip)) {
        return { error: 'Insira um IP válido. Exemplo: 192.168.0.1' };
      }

    try {
    const InfoInternetPayload = {
      nome: formData.nome,
      senha: formData.senha,
      ip: formData.ip
    }
    
      await api.post(`infoInternet/departamento/${id}`, InfoInternetPayload)
      return {};
    } catch (error) {
      return { error: 'Ocorreu um erro ao criar a Info Internet. Tente novamente.' };
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Nova Informação de Internet</h1>
        <Formulario campos={campos} 
        onSubmit={async (formData) => {
          const result = await handleFormSubmit(formData);
          if (result.error) {
            setErrorMessage(result.error);
          }
          return result; 
        }} 
        voltarUrl={`/departamentos/${id}/infoInternet`}
        errorMessage={errorMessage} />
      </main>
    </div>
  );
};

export default NovaInfoInternet;