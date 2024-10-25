import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api';
import Cabecalho from '../../Cabecalho/Cabecalho';
import styles from '../../Cadastro/Novo.module.css';

const GerarRelatorio = () => {
    //const { userProfile } = useContext(UserContext);
    const [tipoSelecionado, setTipoSelecionado] = useState('');
    const [subTipoOptions, setSubTipoOptions] = useState([]);
    const [subTipoSelecionado, setSubTipoSelecionado] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    /*let url = '';
    if (userProfile === 'ADM') {
        url = '/menu';
    } else {
        url = '/menu2';
    }*/

    const handleTipoChange = (tipo) => {
        setTipoSelecionado(tipo);
        setSubTipoSelecionado(''); // Resetar seleção anterior

        // Fetch dynamic options based on the selected type
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

    // Fetch functions to get data from backend
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
    };

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
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await api.get('/relatorios/ordens-de-servico', {
                params: {
                    dataInicio: dataInicio,
                    dataFim: dataFim,
                    tipo: tipoSelecionado,
                    filtro: subTipoSelecionado,
                },
                responseType: 'blob', // Para que a resposta seja tratada como um arquivo
            });

            // Crie um URL para o blob recebido e abra em uma nova aba
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank'); // Abre o PDF em uma nova aba
        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
            alert("Ocorreu um erro ao gerar o relatório. Tente novamente.");
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
                    <Link to="/menu" className={styles.linkBtn}>
                        <button className={styles.btnBack} aria-label='Voltar'>Voltar</button>
                    </Link>
                    <button type="submit" className={styles.btnSubmit}>
                        Gerar Relatório
                    </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default GerarRelatorio;
