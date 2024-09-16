import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoDepartamento = () => {
  const [secretarias, setSecretarias] = useState([]);

  // Fetch secretarias from the backend
  useEffect(() => {
    const fetchSecretarias = async () => {
      try {
        const response = await api.get('/secretarias');  // Assumindo que você tem essa rota configurada
        setSecretarias(response.data);
        console.log(response.data);  // Verifique os dados retornados
      } catch (error) {
        console.error('Erro ao carregar secretarias:', error);
      }
    };
    fetchSecretarias();
  }, []);

  const campos = [
    { label: 'Nome', name: 'nome', type: 'text' },
    { label: 'Fone', name: 'fone', type: 'text' },
    {
      label: 'Secretaria',
      name: 'secretariaId',
      type: 'select',
      options: secretarias.map(sec => {
        console.log(sec); // Verifique os dados de cada secretaria
        return { label: sec.nome, value: sec.id };
      })  // Gerando as opções
    }
  ]

  const handleFormSubmit = async (formData) => {
    try {
      await api.post('/departamentos', formData);
      console.log('Dados do formulário:', formData);
    } catch (error) {
      console.error('Erro ao criar departamento:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Departamento</h1>
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl="/departamentos" />
      </main>
    </div>
  );
};

export default NovoDepartamento;