import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovaInfoInternet = () => {
  const { id } = useParams();
  const campos = [
    { label: '*Nome da Rede', name: 'nome', type: 'text' },
    { label: '*Senha', name: 'senha', type: 'text' },
    { label: 'IP', name: 'ip', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    const InfoInternetPayload = {
      nome: formData.nome,
      senha: formData.senha,
      ip: formData.ip
    }
    try {
      await api.post(`infoInternet/departamento/${id}`, InfoInternetPayload)
    } catch (error) {
      console.error('Erro ao enviar formulario:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Nova Informação de Internet</h1>
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl={`/departamentos/${id}/infoInternet`} />
      </main>
    </div>
  );
};

export default NovaInfoInternet;