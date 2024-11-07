import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import Formulario from '../Formulario/Formulario';
import styles from '../Novo.module.css';

const NovoEquipamento = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState('');

  const campos = [
    { label: '*Número de Patrimônio', name: 'num_patrimonio', type: 'text' },
    { label: 'Modelo', name: 'modelo', type: 'text' },
    { label: 'Marca', name: 'marca', type: 'text' },
    { label: 'Data de aquisição', name: 'data_aquisicao', type: 'date' },
    { label: 'Descrição Técnica', name: 'descr_tec', type: 'text' }
  ]

  const handleFormSubmit = async (formData) => {
    setErrorMessage('');

    if (!formData.num_patrimonio) {
      return { error: 'Preencha todos os campos obrigatórios.' };
    }

    try {
      const response = await api.get(`/equipamentos?num_patrimonio=${formData.num_patrimonio}`);
      const equipamentoExists = response.data.some((equip) => equip.num_patrimonio === formData.num_patrimonio);
  
      if (equipamentoExists) {
        return { error: 'Já existe um equipamento cadastrado com esse número de patrimônio.' };
      }

      const equipPayload = {
        data_aquisicao: formData.data_aquisicao,
        num_patrimonio: formData.num_patrimonio,
        modelo: formData.modelo,
        marca: formData.marca,
        descr_tec: formData.descr_tec,
        equipamento: id
      };
  
      await api.post(`equipamentos/equipamentodep?departamentoId=${id}`, equipPayload);
      return {};
    } catch (error) {
      return { error: 'Ocorreu um erro ao criar o equipamento. Tente novamente.' };
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Novo Equipamento</h1>
        <Formulario campos={campos} 
        onSubmit={async (formData) => {
          const result = await handleFormSubmit(formData);
          if (result.error) {
            setErrorMessage(result.error);
          }
          return result;
        }} 
        voltarUrl={`/departamentos/${id}/equipamentos`}
        errorMessage={errorMessage} />
      </main>
    </div>
  );
};

export default NovoEquipamento;