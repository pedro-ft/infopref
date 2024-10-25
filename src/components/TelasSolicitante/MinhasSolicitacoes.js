import { format } from 'date-fns';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import ActionBar from '../ActionBar/ActionBar';
import Cabecalho from '../Cabecalho/Cabecalho';
import MinhasSolicitacoesItem from './MinhasSolicitacoesItem';
import styles from './TelasSolicitante.module.css';

function MinhasSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('Mais recentes');
    const itemsPerPage = 5;
    const [solicitanteId, setSolicitanteId] = useState();

    const statusMapping = {
        AGUARDANDO_PEÇAS: "Aguardando peças",
        EM_ABERTO: "Em aberto",
        EM_ANDAMENTO: "Em andamento",
        FINALIZADO: "Finalizado",
    };

    useEffect(() => {
        const getSolicitanteIdFromToken = async () => {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                try {
                    const token = authToken.replace('Bearer ', '');
                    const decoded = jwtDecode(token);
                    console.log('Decoded token:', decoded);

                    const userId = decoded.jti;
                    console.log('User ID:', userId);

                    const response = await api.get(`/solicitantes/usuario/${userId}`);
                    console.log('Solicitante response:', response.data);
                    setSolicitanteId(response.data.id);
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                }
            }
        };

        getSolicitanteIdFromToken();
    }, []);

    useEffect(() => {
        if (solicitanteId) {
            const fetchSolicitacoes = async () => {
                console.log('Fetching solicitacoes for ID:', solicitanteId);
                try {
                    const response = await api.get(`/osmenu/solicitante/${solicitanteId}`);
                    console.log('Solicitacoes response:', response.data);
                    setSolicitacoes(response.data);
                } catch (error) {
                    console.error('Erro ao buscar ordens de serviço:', error);
                }
            };

            fetchSolicitacoes();
        } else {
            console.warn('Solicitante ID não está definido.');
        }
    }, [solicitanteId]);

    const filteredSolicitacoes = solicitacoes
        .filter(solicitacao =>
            solicitacao.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            solicitacao.status.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortType) {
                case 'Mais antigo':
                    return a.id - b.id;
                case 'Status':
                    return a.status.localeCompare(b.status);
                case 'Mais recente':
                default:
                    return b.id - a.id;
            }
        });

    const totalPages = Math.ceil(filteredSolicitacoes.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredSolicitacoes.slice(startIndex, startIndex + itemsPerPage);

    const handleSort = (type) => {
        setSortType(type);
    };

    return (
        <main className={styles.solicitacaoModule}>
            <Cabecalho />
            <ActionBar tipo='Solicitar Nova Ordem de Serviço'
                link='solicitar-ordem'
                onSearch={handleSearch}
                onSort={handleSort}
                sortOptions={['Mais recente', 'Mais antigo', 'Status']}
                showChangePassword={true} />
            <div className={styles.contentWrapper}>
                <h2 className={styles.listTitle}>Minhas Solicitações</h2>
                <section className={styles.listSection}>
                    {currentItems.length > 0 ? (
                        currentItems.map((solicitacao, index) => (
                            <MinhasSolicitacoesItem key={index} id={solicitacao.id}
                                data_abertura={solicitacao.data_abertura ? format(new Date(solicitacao.data_abertura), "dd/MM/yyyy") : ''}
                                data_finalizacao={solicitacao.data_finalizacao ? format(new Date(solicitacao.data_finalizacao), "dd/MM/yyyy") : ''}
                                descricao={solicitacao.descricao}
                                resolucao={solicitacao.resolucao}
                                patrimonio={solicitacao.equipamentos.map(eq => eq.num_patrimonio).join(', ')}
                                status={statusMapping[solicitacao.status]}
                            />
                        ))
                    ) : (
                        <p>Nenhuma solitação encontrada.</p>
                    )}
                </section>
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>{currentPage} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Próximo
                </button>
            </div>
        </main>
    )
}

export default MinhasSolicitacoes;