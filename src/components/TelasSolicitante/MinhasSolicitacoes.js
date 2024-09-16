import React, { useState } from 'react';
import styles from './TelasSolicitante.module.css';
import Cabecalho from '../Cabecalho/Cabecalho';
import ActionBar from '../ActionBar/ActionBar';
import MinhasSolicitacoesItem from './MinhasSolicitacoesItem';

function MinhasSolicitacoes() {
    const solicitacoes = [
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
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    const filteredSolicitacoes = solicitacoes.filter(solicitacao =>
        solicitacao.numProtocolo.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <MinhasSolicitacoesItem key={index} {...solicitacao} />
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