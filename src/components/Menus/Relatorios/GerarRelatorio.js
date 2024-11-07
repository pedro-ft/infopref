import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import styles from '../../Cadastro/Novo.module.css';
import { UserContext } from '../../context/UserContext';

const GerarRelatorio = () => {
    const [tipoSelecionado, setTipoSelecionado] = useState('');
    const [subTipoOptions, setSubTipoOptions] = useState([]);
    const [subTipoSelecionado, setSubTipoSelecionado] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { userProfile } = useContext(UserContext);
    const navigate = useNavigate();

    const handleTipoChange = (tipo) => {
        setTipoSelecionado(tipo);
        setSubTipoSelecionado('');

        switch (tipo) {
            case 'solicitante':
                fetchSolicitantes();
                break;
            case 'secretaria':
                fetchSecretarias();
                break;
            case 'departamento':
                fetchDepartamentos();
                break;
            case 'tecnico':
                fetchTecnicos();
                break;
            case 'tipo_chamado':
                fetchTiposChamado();
                break;
            default:
                setSubTipoOptions([]);
        }
    };

    const fetchSolicitantes = async () => {
        try {
            const response = await api.get('/solicitantes');
            const options = response.data.map((item) => ({ label: item.nome, value: item.id }));
            setSubTipoOptions(options);
        } catch (error) {
            console.error('Erro ao buscar solicitantes:', error);
        }
    };

    const fetchSecretarias = async () => {
        try {
            const response = await api.get('/secretarias');
            const options = response.data.map((item) => ({ label: item.nome, value: item.id }));
            setSubTipoOptions(options);
        } catch (error) {
            console.error('Erro ao buscar secretarias:', error);
        }
    };

    const fetchDepartamentos = async () => {
        try {
            const response = await api.get('/departamentos');
            const options = response.data.map((item) => ({ label: item.nome, value: item.id }));
            setSubTipoOptions(options);
        } catch (error) {
            console.error('Erro ao buscar departamentos:', error);
        }
    };

    const fetchTecnicos = async () => {
        try {
            const response = await api.get('/tecnicos');
            const options = response.data.map((item) => ({ label: item.nome, value: item.id }));
            setSubTipoOptions(options);
        } catch (error) {
            console.error('Erro ao buscar técnicos:', error);
        }
    }

    const fetchTiposChamado = () => {
        const options = [
            { label: "Hardware", value: "HARDWARE" },
            { label: "Software", value: "SOFTWARE" },
            { label: "Rede", value: "REDE" },
            { label: "Segurança", value: "SEGURANCA" },
            { label: "Suporte Geral", value: "SUPORTE_GERAL" },
            { label: "Manutenção Preventiva", value: "MANUTENCAO_PREVENTIVA" }
        ];
        setSubTipoOptions(options);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!dataInicio || !dataFim || !tipoSelecionado || !subTipoSelecionado) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        }
        if (dataInicio > dataFim) {
            setErrorMessage("A data de início não pode ser maior que a data final.");
            return;
        }
        setErrorMessage('');
        try {
            const response = await api.get('/relatorios/ordens-de-servico', {
                params: {
                    dataInicio: dataInicio,
                    dataFim: dataFim,
                    tipo: tipoSelecionado,
                    filtro: subTipoSelecionado,
                },
                responseType: 'blob', 
            });
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank'); 
        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
            setErrorMessage("Ocorreu um erro ao gerar o relatório. Tente novamente.");
        }
    };

    const handleBackClick = () => {
        if (userProfile === 'ADM') {
          navigate('/menu');
        } else if (userProfile === 'TECNICO') {
          navigate('/menu2');
        }
      };

    return (
        <div className={styles.container}>
            <Cabecalho />
            <main className={styles.mainContent}>
                <h1 className={styles.pageTitle}>Gerar Relatório</h1>
                <form onSubmit={handleFormSubmit} className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label>Data Início</label>
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Data Final</label>
                        <input
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Relatório por</label>
                        <select
                            value={tipoSelecionado}
                            onChange={(e) => handleTipoChange(e.target.value)}
                        >
                            <option value="">Selecione uma opção</option>
                            <option value="solicitante">Solicitante</option>
                            <option value="secretaria">Secretaria</option>
                            <option value="departamento">Departamento</option>
                            <option value="tecnico">Técnico</option>
                            <option value="tipo_chamado">Tipo chamado</option>
                        </select>
                    </div>
                    {tipoSelecionado && (
                        <div className={styles.formGroup}>
                            <label>{`Selecione o ${tipoSelecionado}`}</label>
                            <select
                                name="subTipo"
                                value={subTipoSelecionado}
                                onChange={(e) => setSubTipoSelecionado(e.target.value)}
                            >
                                <option value="">Selecione uma opção</option>
                                {subTipoOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                        </div>
                    )}
                    <div className={styles.formButtons}>
                    <button className={styles.btnBack} aria-label='Voltar' onClick={handleBackClick}>Voltar</button>
                    <button type="submit" className={styles.btnSubmit}>
                        Gerar Relatório
                    </button>
                    </div>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </form>
            </main>
        </div>
    );
}

export default GerarRelatorio;
