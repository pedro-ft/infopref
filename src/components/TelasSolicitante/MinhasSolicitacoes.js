import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import ActionBar from '../ActionBar/ActionBar';
import Cabecalho from '../Cabecalho/Cabecalho';
import MinhasSolicitacoesItem from './MinhasSolicitacoesItem';
import styles from './TelasSolicitante.module.css';

function MinhasSolicitacoes() {
    /*const solicitacoes = [
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            dataFinalizacao: "29/03/2022",
            status: 'Em aberto',
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            dataFinalizacao: "29/03/2022",
            status: 'Em aberto',
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            dataFinalizacao: "29/03/2022",
            status: 'Em aberto',
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            dataFinalizacao: "29/03/2022",
            status: 'Em aberto',
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            dataFinalizacao: "29/03/2022",
            status: 'Em aberto',
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009826",
            dataAbertura: "29/03/2022",
            dataFinalizacao: "29/03/2022",
            status: 'Em aberto',
            descricao: "Laptop com processador Intel i5, 8GB RAM, 256GB SSD.",
            imageUrl: "/imagens/ordem.svg"
        },
    ];*/

    const [solicitacoes, setSolicitacoes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    const solicitanteId = 6;

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            try {
                const response = await api.get(`/osmenu/solicitante/${solicitanteId}`);
                setSolicitacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar ordens de serviço:', error);
            }
        };
        fetchSolicitacoes();
    }, [solicitanteId]);

    const filteredSolicitacoes = solicitacoes.filter(solicitacao =>
        solicitacao.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    return (
        <main className={styles.solicitacaoModule}>
            <Cabecalho />
            <ActionBar tipo='Solicitar Nova Ordem de Serviço' link='solicitar-ordem' onSearch={handleSearch} />
            <div className={styles.contentWrapper}>
                <h2 className={styles.listTitle}>Minhas Solicitações</h2>
                <section className={styles.listSection}>
                    {currentItems.map((solicitacao, index) => (
                        <MinhasSolicitacoesItem key={index} id={solicitacao.id}
                            data_abertura={format(solicitacao.data_abertura, "dd/MM/yyyy")}
                            data_finalizacao={format(solicitacao.data_finalizacao, "dd/MM/yyyy")}
                            descricao={solicitacao.descricao}
                            status={solicitacao.status}
                        />
                    ))}
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