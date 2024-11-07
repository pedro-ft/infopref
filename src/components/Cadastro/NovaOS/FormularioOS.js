import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import styles from './FormularioOS.module.css';

const FormularioOS = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFormData = location.state?.formData || {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [solicitante, setSolicitantes] = useState([]);
  const [status, setStatus] = useState([]);
  const [tipo_chamado, setTipoChamado] = useState([]);
  const [prioridade, setPrioridades] = useState([]);
  const [tecnico, setTecnicos] = useState([]);

  useEffect(() => {
    const fetchSelects = async () => {
      try {
        let response = await api.get('/tecnicos');
        setTecnicos(response.data);

        response = await api.get('/solicitantes');
        setSolicitantes(response.data);

        setTipoChamado([{ key: "Hardware", value: "HARDWARE" }, { key: "Software", value: "SOFTWARE" }, { key: "Rede", value: "REDE" }, { key: "Segurança", value: "SEGURANCA" }, { key: "Suporte Geral", value: "SUPORTE_GERAL" }, { key: "Manutenção Preventiva", value: "MANUTENCAO_PREVENTIVA" }]);

        setStatus([{ key: "Aguardando peças", value: "AGUARDANDO_PEÇAS" }, { key: "Em andamento", value: "EM_ANDAMENTO" }, { key: "Finalizado", value: "FINALIZADO" }]);

        setPrioridades(["Baixa", "Normal", "Urgente"]);
      } catch (error) {
      }
    };
    fetchSelects();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'status' && value !== 'FINALIZADO') {
      setFormData((prevData) => ({
        ...prevData,
        data_finalizacao: '',
        resolucao: ''
      }));
    }
  };


  const handleNext = async (e) => {
    e.preventDefault();
    navigate('/selecionar-equipamentos', { state: { formData } });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleNext}>
        <div className={styles.formGroup}>
          <label>*Data Abertura:</label>
          <input
            type="date"
            name="data_abertura"
            value={formData.data_abertura}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>*Nome Solicitante:</label>
          <select
            name="cod_sol"
            value={formData.cod_sol}
            onChange={handleInputChange}
          >
            <option value="">Selecione o solicitante</option>
            {solicitante
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map(sol => (
                <option key={sol.id} value={sol.id}>{sol.nome}</option>
              ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>*Tipo Chamado:</label>
            <select
              name="tipo_chamado"
              value={formData.tipo_chamado}
              onChange={handleInputChange}
            >
              <option value="">Selecione o Tipo do Chamado</option>
              {tipo_chamado.map(stat => {
                return <option key={stat.key} value={stat.value}>{stat.key}</option>
              })}
            </select>
          </div>


        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>*Status:</label>
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
            <label>*Prioridade:</label>
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
            <label>*Técnico:</label>
            <select
              label='Tecnico'
              name="cod_tec"
              value={formData.cod_tec}
              onChange={handleInputChange}
            >
              <option value="">Selecione o técnico</option>
              {tecnico
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map(x => (
                  <option key={x.id} value={x.id}>{x.nome}</option>
                ))}
            </select>
          </div>

          {formData.status === "FINALIZADO" && (
            <div>
              <div className={styles.formGroup}>
                <label>Data Finalização:</label>
                <input
                  type="date"
                  name="data_finalizacao"
                  value={formData.data_finalizacao}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
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

        {formData.status === "FINALIZADO" && (
          <div className={styles.formGroup}>
            <label>Resolução:</label>
            <textarea
              name="resolucao"
              value={formData.resolucao}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
        )}

        <div className={styles.formButtons}>
          <Link className={styles.linkBtn} to="/osmenu">
            <button type="button" className={styles.btnBack}>Voltar</button>
          </Link>
          <button type="submit" className={styles.btnSubmit}>Próximo</button>

        </div>

        <p className="form-note">* Campos obrigatórios</p>
      </form>
    </div>
  );
};

export default FormularioOS;
