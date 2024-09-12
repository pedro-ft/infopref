import React, { useState } from 'react';
import './FormularioOS.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FormularioOS = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dataAbertura: '',
    nomeSolicitante: '',
    secretaria: '',
    departamento: '',
    tipoChamado: '',
    numeroPatrimonio: '',
    status: '',
    prioridade: '',
    tecnico: '',
    dataFinalizacao: '',
    descricao: '',
    resolucao: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/osmenu');
    console.log(formData);
    // Lógica para enviar os dados
  };

  return (
    <div className="form-container">
      <h2>Nº de Protocolo: 163247382</h2>

      <form onSubmit={handleSubmit}>
      <div className="form-group">
            <label>Data Abertura:</label>
            <input
              type="date"
              name="dataAbertura"
              value={formData.dataAbertura}
              onChange={handleInputChange}
            />
          </div>
        
        <div className="form-group">
          <label>Nome Solicitante:</label>
          <input
            type="text"
            name="nomeSolicitante"
            value={formData.nomeSolicitante}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
        <div className="form-group">
            <label>Secretaria:</label>
            <select
              name="secretaria"
              value={formData.secretaria}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="educação">Educação</option>
              <option value="saúde">Saúde</option>
              <option value="segurança">Segurança</option>
            </select>
          </div>

          <div className="form-group">
            <label>Departamento:</label>
            <select
              name="departamento"
              value={formData.departamento}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="educação">Educação</option>
              <option value="saúde">Saúde</option>
              <option value="segurança">Segurança</option>
            </select>
          </div>

        </div>

        <div className="form-row">
        <div className="form-group">
            <label>Tipo Chamado:</label>
            <select
              name="tipoChamado"
              value={formData.tipoChamado}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="Formatação">Formatação</option>
              <option value="Troca de Peças">Troca de Peças</option>
              <option value="Limpeza">Limpeza</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nº Patrimônio:</label>
            <input
              type="text"
              name="numeroPatrimonio"
              value={formData.numeroPatrimonio}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="aberto">Aberto</option>
              <option value="fechado">Fechado</option>
              <option value="em andamento">Em andamento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Prioridade:</label>
            <select
              name="prioridade"
              value={formData.prioridade}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>
        </div>

        <div className="form-row">
        <div className="form-group">
            <label>Técnico:</label>
            <select
              name="tecnico"
              value={formData.tecnico}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="Leonardo Mulinari">Leonardo Mulinari</option>
              <option value="Pedro Taborda">Pedro Taborda</option>
              <option value="Jonas de Godoi">Jonas de Godoi</option>
            </select>
          </div>

          <div className="form-group">
            <label>*Data Finalização:</label>
            <input
              type="date"
              name="dataFinalizacao"
              value={formData.dataFinalizacao}
              onChange={handleInputChange}
            />
          </div>
        </div>

          <div className="form-group">
            <label>Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Resolução:</label>
            <input
              type="text"
              name="resolucao"
              value={formData.resolucao}
              onChange={handleInputChange}
            />
          </div>

        <div className="form-buttons">
        <Link className="link-btn" to="/osmenu">
            <button type="button" className="btn-back">Voltar</button>
        </Link>
            <button type="submit" className="btn-submit">Enviar</button>
        </div>

        <p className="form-note">* Campos não obrigatórios</p>
      </form>
    </div>
  );
};

export default FormularioOS;
