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
            numProtocolo: "21009827",
            dataAbertura: "05/04/2022",
            dataFinalizacao: "10/04/2022",
            status: 'Finalizado',
            descricao: "Substituição do monitor por tela de 24 polegadas Full HD.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009828",
            dataAbertura: "12/04/2022",
            dataFinalizacao: null,
            status: 'Em andamento',
            descricao: "Configuração de rede e ajustes de VPN para home office.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009829",
            dataAbertura: "20/04/2022",
            dataFinalizacao: "22/04/2022",
            status: 'Finalizado',
            descricao: "Instalação de software de segurança e backup automático.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009830",
            dataAbertura: "01/05/2022",
            dataFinalizacao: null,
            status: 'Pendente',
            descricao: "Atualização do sistema operacional para versão mais recente.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009831",
            dataAbertura: "10/05/2022",
            dataFinalizacao: null,
            status: 'Em aberto',
            descricao: "Reparação da impressora de rede com erro de conexão.",
            imageUrl: "/imagens/ordem.svg"
        },
        {
            numProtocolo: "21009832",
            dataAbertura: "15/05/2022",
            dataFinalizacao: "18/05/2022",
            status: 'Finalizado',
            descricao: "Substituição de HD por SSD em desktop.",
            imageUrl: "/imagens/ordem.svg"
        }
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