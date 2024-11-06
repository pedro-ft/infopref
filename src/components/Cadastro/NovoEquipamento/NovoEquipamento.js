import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoEquipamento = () => {
  const { id } = useParams();
  const campos = [
    { label: '*Número de Patrimônio', name: 'num_patrimonio', type: 'text' },
    { label: 'Modelo', name: 'modelo', type: 'text' },
    { label: 'Marca', name: 'marca', type: 'text' },
    { label: 'Data de aquisição', name: 'data_aquisicao', type: 'date' },
    { label: 'Descrição Técnica', name: 'descr_tec', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    const equipPayload = {
      data_aquisicao: formData.data_aquisicao,
      num_patrimonio: formData.num_patrimonio,
      modelo: formData.modelo,
      marca: formData.marca,
      descr_tec: formData.descr_tec,
      equipamento: id
    }
    try {
      await api.post(`equipamentos/equipamentodep?departamentoId=${id}`, equipPayload)
    } catch (error) {
      console.error('Erro ao enviar formulario:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Equipamento</h1>
        <Formulario campos={campos} onSubmit={handleFormSubmit} voltarUrl={`/departamentos/${id}/equipamentos`} />
      </main>
    </div>
  );
};

export default NovoEquipamento;