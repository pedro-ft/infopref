import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import styles from './FormularioOS.module.css';

const FormularioOS = () => {
  const navigate = useNavigate();
  const [solicitante, setSolicitantes] = useState([]);
  const [status, setStatus] = useState([]);
  const [prioridade, setPrioridades] = useState([]);
  const [tecnico, setTecnicos] = useState([]);

  useEffect(() => {
    const fetchSelects = async () => {
      try {
        let response = await api.get('/tecnicos');
        setTecnicos(response.data);

        response = await api.get('/solicitantes');
        setSolicitantes(response.data);

        setStatus([{ key: "Aguardando peças", value: "AGUARDANDO_PEÇAS" }, { key: "Em andamento", value: "EM_ANDAMENTO" }, { key: "Finalizado", value: "FINALIZADO" }]);

        setPrioridades(["Baixa", "Normal", "Urgente"]);
        console.log(response.data);  // Verifique os dados retornados
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      }
    };
    fetchSelects();
  }, []);

  const [formData, setFormData] = useState({
    data_abertura: '',
    cod_sol: '',
    tipo_chamado: '',
    num_patrimonio: '',
    status: '',
    prioridade: '',
    cod_tec: '',
    data_finalizacao: '',
    descricao: '',
    resolucao: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Payload enviado:', formData);
    try {
      await api.post('/osmenu', formData);  // Enviando o payload correto
      navigate('/osmenu');
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
    }
  };*/

  const handleNext = async (e) => {
    e.preventDefault();
    navigate('/selecionar-equipamentos', { state: { formData } });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleNext}>
        <div className={styles.formGroup}>
          <label>Data Abertura:</label>
          <input
            type="date"
            name="data_abertura"
            value={formData.data_abertura}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Nome Solicitante:</label>
          <select
            name="cod_sol"
            value={formData.cod_sol}
            onChange={handleInputChange}
          >
            <option value="">Selecione o solicitante</option>
            {solicitante.map(sol => (
              <option key={sol.id} value={sol.id}>{sol.nome}</option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Tipo Chamado:</label>
            <input
              type='text'
              name="tipo_chamado"
              value={formData.tipo_chamado}
              onChange={handleInputChange}
            >
            </input>
          </div>


        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="">Selecione o status</option>
              {status.map(stat => {
                return <option key={stat.key} value={stat.value}>{stat.key}</option>
              })}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Prioridade:</label>
            <select
              name="prioridade"
              value={formData.prioridade}
              onChange={handleInputChange}
            >
              <option value="">Selecione a prioridade</option>
              {prioridade.map(prio => {
                return <option key={prio} value={prio}>{prio}</option>
              })}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Técnico:</label>
            <select
              label='Tecnico'
              name="cod_tec"
              value={formData.cod_tec}
              onChange={handleInputChange}
            >
              <option value="">Selecione o técnico</option>
              {tecnico.map(x => (
                <option key={x.id} value={x.id}>{x.nome}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>*Data Finalização:</label>
            <input
              type="date"
              name="data_finalizacao"
              value={formData.data_finalizacao}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            rows="3"
          />
        </div>
        <div className={styles.formGroup}>
          <label>*Resolução:</label>
          <textarea
            name="resolucao"
            value={formData.resolucao}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className={styles.formButtons}>
          <Link className={styles.linkBtn} to="/osmenu">
            <button type="button" className={styles.btnBack}>Voltar</button>
          </Link>
          <button type="submit" className={styles.btnSubmit}>Próximo</button>
        </div>

        <p className="form-note">* Campos não obrigatórios</p>
      </form>
    </div>
  );
};

export default FormularioOS;
