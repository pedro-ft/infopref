// HelpModal.js
import React, { useEffect, useState } from 'react';
import styles from './HelpModal.module.css';

const helpContent = {
    'Menu Principal': {
        title: 'Ajuda: Menu Principal',
        content: 'Aqui estão as informações sobre a tela de Menu Principal...',
        subTabs: {
            'Menu Principal': {
                title: 'Ajuda: Menu Principal',
                content: `<p> O Menu Lateral, localizado à esquerda da tela, fornece acesso rápido às diferentes seções do sistema:</p>
                    <ul>
                        <li><strong>Ordens de Serviço</strong>: Visualize, crie e edite ordens de serviço.</li>
                        <li><strong>Solicitantes</strong>: Acesse e gerencie as informações de solicitantes.</li>
                        <li><strong>Secretarias</strong>: Veja e edite as informações das secretarias associadas.
                        <li><strong>Departamentos</strong>: Acesse os dados dos departamentos e edite conforme necessário, bem como equipamentos e informações de internet associadas ao departamento.
                        <li><strong>Técnicos</strong>: Visualize e edite os perfis dos técnicos.
                        <li><strong>Relatórios</strong>: Gere relatórios filtrados de ordens de serviço com base em diferentes critérios (data, solicitante, departamento, entre outros).
                    </ul>
                    <p>Para navegar, clique em uma das opções e será redirecionado para a tela específica.</p>
                    <br/>

                    <p>No centro da tela, há diversos cards que exibem informações importantes sobre o status das Ordens de Serviço:</p>
                    <ul>
                        <li><strong>Ordens em Aberto</strong>: Mostra o número de ordens de serviço que ainda não foram atendidas.
                        <li><strong>Ordens em Andamento</strong>: Exibe o total de ordens de serviço que estão sendo trabalhadas.
                        <li><strong>Ordens Finalizadas Este Mês</strong>: Mostra a quantidade de ordens de serviço finalizadas no mês atual.
                        <li><strong>Ordens com Prioridade Urgente</strong>: Exibe a contagem de ordens de serviço marcadas como urgentes, que demandam atenção especial.
                    </ul>
                    <p>Esses cards oferecem uma visão geral rápida do status atual das ordens de serviço, facilitando o acompanhamento e a priorização das tarefas.</p>
                `
            },
            'Cabeçalho': {
                title: 'Ajuda: Cabeçalho',
                content: `
            <p>O cabeçalho está presente em todas as telas da aplicação, fornecendo as seguintes funcionalidades:</p>
            <ul>
                <li><strong>Nome do Usuário</strong>: Exibe o nome do usuário logado, indicando o perfil de acesso.
                <li><strong>Ícone de Ajuda</strong>: Ao clicar no ícone de interrogação, abre-se o modal de ajuda (esta tela), oferecendo informações e orientações sobre o uso do sistema.
                <li><strong>Botão de Logout</strong>: Representado pelo ícone de saída, permite ao usuário sair da conta e retornar à tela de login.
            </ul>
            <p>Utilize o cabeçalho para acessar rapidamente o conteúdo de ajuda ou para fazer logout da aplicação.</p>
        `
            }
        }
    },
    'Ordem de Serviço': {
        title: 'Ajuda: Ordens de Serviço',
        content: 'Aqui estão as informações sobre a tela de Ordens de Serviço...',
        subTabs: {
            'Ordem de Serviço': {
                title: 'Ajuda: Ordens de Serviço',
                content: `<p>Descrição Geral: Esta tela exibe todas as ordens de serviço já aceitas, ou seja, aquelas que não estão mais no status "Em Aberto". Aqui, você pode ver as ordens de serviço em um formato de lista ou optar por visualizá-las em formato de cards, além de aplicar filtros e pesquisas para encontrar ordens específicas.</p>
                </br>
                <p><strong>Filtros e Exibição</strong></p>
                <ul>   
                <li><strong>Filtros de Data</strong>: No topo da página, há campos para inserir a "Data de Início" e "Data de Fim". Esses filtros permitem limitar a exibição de ordens de serviço em um período específico.

                <li><strong>Modo de Exibição</strong>:
                    <ul>
                        <li><strong>Lista (Padrão)</strong>: Exibe as ordens de serviço em formato de lista, com informações organizadas em colunas.
                         <li><strong>Cards</strong>: Clicando no botão "Exibir Cards", você pode alternar para a visualização em cards. Neste formato, as ordens aparecem em uma disposição mais detalhada e visual, com destaque para as informações principais.
                    </ul>
                </ul>
                </br>
                <p><strong>Pesquisa e Ordenação</strong></p>
                    <ul>
                    <li><strong>Barra de Pesquisa</strong>:
                        <ul>
                        <li>A barra de pesquisa permite buscar ordens de serviço por diversos campos, como número de protocolo, status, solicitante, departamento, técnico, entre outros.
                        <li><strong>Busca Combinada</strong>: Você pode combinar critérios de pesquisa, por exemplo, buscar por "Solicitante + Status" para uma busca mais específica.
                        </ul>
                    <li><strong>Ordenação</strong>: Ao lado da barra de pesquisa, há um botão de ordenação, que permite organizar as ordens de serviço de acordo com os seguintes critérios:
                        <ul>
                        <li><strong>Mais Recente (Padrão)</strong>: Exibe as ordens começando pelas mais recentes.
                        <li><strong>Mais Antigo</strong>: Ordena pelas ordens mais antigas.
                        <li><strong>Prioridade</strong>: Ordena com base no nível de prioridade.
                        <li><strong>Status</strong>: Ordena pelo status da ordem.
                        <li><strong>Tipo de Chamado</strong>: Ordena com base no tipo de chamado.
                        <li><strong>Secretaria</strong>: Ordena por secretaria associada à ordem.
                        <li><strong>Departamento</strong>: Ordena as ordens por departamento.
                        <li><strong>Solicitante</strong>: Ordena por nome do solicitante.
                        <li><strong>Técnico</strong>: Ordena de acordo com o técnico responsável.
                        </ul>
                    </ul>
                    </br>
                <p><strong>Informações Exibidas</strong></p>
                <p>Para cada ordem de serviço, você verá uma série de informações relevantes para acompanhamento e gestão:</p>
                    <ul>
                    <li><strong>Número de Protocolo</strong>: Identificador único da ordem de serviço.
                    <li><strong>Data de Abertura</strong>: Data em que a ordem foi criada.
                    <li><strong>Data de Finalização</strong>: Data em que a ordem foi concluída, caso já esteja finalizada.
                    <li><strong>Número de Patrimônio do Equipamento</strong>: Número de patrimônio do equipamento associado à ordem de serviço.
                    <li><strong>Tipo de Chamado</strong>: Categoria ou tipo da solicitação.
                    <li><strong>Prioridade</strong>: Nível de prioridade da ordem de serviço (por exemplo, Urgente).
                    <li><strong>Status</strong>: Situação atual da ordem de serviço (Ex: Em Andamento, Finalizado).
                    <li><strong>Solicitante</strong>: Nome do usuário que solicitou a ordem.
                    <li><strong>Secretaria e Departamento</strong>: Secretaria e departamento associados ao solicitante.
                    <li><strong>Técnico</strong>: Técnico designado para atender a ordem de serviço.
                    </ul>
                </br>

                <p><strong>Navegação entre Páginas</strong></p>
                <p>Na parte inferior da tela, você encontrará botões de navegação de página. Esses botões permitem avançar ou retroceder entre as páginas de ordens de serviço, facilitando a visualização de ordens mais antigas.</p>     
                </br>

                <p><strong>Botões no Topo da Tela</strong></p>
                <ul>
                    <li><strong>Nova O.S.</strong>: Ao clicar nesse botão, você será redirecionado para a criação de uma nova ordem de serviço.
                    <li><strong>O.S. Solicitadas</strong>: Esse botão redireciona para a página de ordens de serviço que ainda não foram aceitas. Aqui, você pode visualizar e decidir quais ordens pendentes deseja aceitar.
                </ul>
                `
            },
            'Nova Ordem de Serviço': {
                title: 'Ajuda: Nova Ordem de Serviço',
                content: 'Aqui estão as informações sobre a tela de Nova Ordem de Serviço...'
            },
            'Ordens de Serviço Solicitadas': {
                title: 'Ajuda: Ordens de Serviço Solicitadas',
                content: 'Aqui estão as informações sobre a tela de Ordens de Serviço Solicitadas...'
            }
        }
    },
    'Solicitante': {
        title: 'Ajuda: Solicitante',
        content: 'Aqui estão as informações sobre a tela de Solicitante...',
        subTabs: {
            'Solicitante': {
                title: 'Ajuda: Solicitante',
                content: 'Aqui estão as informações sobre a tela de Solicitante...'
            },
            'Nova Solicitante': {
                title: 'Ajuda: Nova Solicitante',
                content: 'Aqui estão as informações sobre a tela de Novo Solicitante...'
            }
        }
    },
    'Secretaria': {
        title: 'Ajuda: Secretaria',
        content: 'Aqui estão as informações sobre a tela de Secretaria...',
        subTabs: {
            'Secretaria': {
                title: 'Ajuda: Secretaria',
                content: 'Aqui estão as informações sobre a tela de Secretaria...'
            },

            'Nova Secretaria': {
                title: 'Ajuda: Nova Secretaria',
                content: 'Aqui estão as informações sobre a tela de Nova Secretaria...'
            }
        }
    },
    'Departamento': {
        title: 'Ajuda: Departamento',
        content: 'Aqui estão as informações sobre a tela de Departamento...',
        subTabs: {
            'Departamento': {
                title: 'Ajuda: Departamento',
                content: 'Aqui estão as informações sobre a tela de Departamento...'
            },

            'Novo Departamento': {
                title: 'Ajuda: Novo Departamento',
                content: 'Aqui estão as informações sobre a tela de Novo Departamento...'
            }
        }
    },
    'Equipamentos': {
        title: 'Ajuda: Equipamentos',
        content: 'Aqui estão as informações sobre a tela de Equipamentos...',
        subTabs: {
            'Equipamentos': {
                title: 'Ajuda: Equipamentos',
                content: 'Aqui estão as informações sobre a tela de Equipamentos...'
            },

            'Novo Equipamento': {
                title: 'Ajuda: Novo Equipamento',
                content: 'Aqui estão as informações sobre a tela de Novo Equipamento...'
            }
        }
    },

    'Informações de Internet': {
        title: 'Ajuda: Informações de Internet',
        content: 'Aqui estão as informações sobre a tela de Informações de Internet...',
        subTabs: {
            'Informações de Internet': {
                title: 'Ajuda: Informações de Internet',
                content: 'Aqui estão as informações sobre a tela de Informações de Internet...'
            },

            'Nova Informação de Internet': {
                title: 'Ajuda: Nova Informação de Internet',
                content: 'Aqui estão as informações sobre a tela de Nova Informação de Internet...'
            }
        }
    },

    'Técnicos': {
        title: 'Ajuda: Técnicos',
        content: 'Aqui estão as informações sobre a tela de Técnicos...',
        subTabs: {
            'Técnicos': {
                title: 'Ajuda: Técnicos',
                content: 'Aqui estão as informações sobre a tela de Técnicos...'
            },

            'Novo Técnico': {
                title: 'Ajuda: Novo Técnico',
                content: 'Aqui estão as informações sobre a tela de Novo Técnico...'
            }
        }
    },
    'Relatórios': {
        title: 'Ajuda: Relatórios',
        content: 'Aqui estão as informações sobre a tela de Relatórios...',
        subTabs: {
            'Relatórios': {
                title: 'Ajuda: Relatórios',
                content: 'Aqui estão as informações sobre a tela de Relatórios...'
            },
        }
    },
};

// Mapeamento entre URLs e abas/sub-abas do modal
const urlToHelpTab = {
    '/menu': { tab: 'Menu Principal', subTab: 'Menu Principal' },
    '/osmenu': { tab: 'Ordem de Serviço', subTab: 'Ordem de Serviço' },
    '/novaos': { tab: 'Ordem de Serviço', subTab: 'Nova Ordem de Serviço' },
    '/osSolicitadas': { tab: 'Ordem de Serviço', subTab: 'Ordens de Serviço Solicitadas' },
    '/solicitantes': { tab: 'Solicitante', subTab: 'Solicitante' },
    '/novo-solicitante': { tab: 'Solicitante', subTab: 'Nova Solicitante' },
    '/secretarias': { tab: 'Secretaria', subTab: 'Secretaria' },
    '/nova-secretaria': { tab: 'Secretaria', subTab: 'Nova Secretaria' },
    '/departamentos': { tab: 'Departamento', subTab: 'Departamentos' },
    '/novo-departamento': { tab: 'Departamento', subTab: 'Novo Departamento' },
    '/departamentos/equipamentos': { tab: 'Equipamentos', subTab: 'Equipamentos' },
    '/novo-equipamento': { tab: 'Equipamentos', subTab: 'Novo Equipamento' },
    '/departamentos/infoInternet': { tab: 'Informações de Internet', subTab: 'Informações de Internet' },
    '/novo-info-internet': { tab: 'Informações de Internet', subTab: 'Nova Informação de Internet' },
    '/tecnicos': { tab: 'Técnicos', subTab: 'Técnicos' },
    '/novo-tecnico': { tab: 'Técnicos', subTab: 'Novo Técnico' },
    '/relatorios': { tab: 'Relatórios', subTab: 'Relatórios' },
};

// Função para remover IDs das URLs dinâmicas
const normalizeUrl = (path) => {
    return path.replace(/\/\d+(?=\/|$)/g, '');
};

const HelpModal = ({ isOpen, onClose }) => {
    const [currentTab, setCurrentTab] = useState('');
    const [expandedTabs, setExpandedTabs] = useState({});
    const [currentMainTab, setCurrentMainTab] = useState('');

    useEffect(() => {
        if (isOpen) {
            const path = window.location.pathname;
            const normalizedPath = normalizeUrl(path);
            const { tab, subTab } = urlToHelpTab[normalizedPath] || {};

            if (tab && subTab) {
                setCurrentMainTab(tab); // Define a aba principal
                setCurrentTab(subTab); // Define a sub-aba
                setExpandedTabs((prev) => ({ ...prev, [tab]: true }));
            }
        }
    }, [isOpen]);

    const handleTabChange = (mainTab, subTab) => {
        setCurrentMainTab(mainTab);
        setCurrentTab(subTab);
    };

    const toggleExpandTab = (tab) => {
        setExpandedTabs((prev) => ({
            ...prev,
            [tab]: !prev[tab]
        }));
    };

    const getCurrentContent = () => {
        const mainContent = helpContent[currentMainTab];
        const subContent = mainContent?.subTabs?.[currentTab];
        return {
            title: subContent?.title || mainContent?.title || 'Ajuda',
            content: subContent?.content || mainContent?.content || 'Conteúdo não encontrado para esta seção.'
        };
    };

    if (!isOpen) return null;

    const { title, content } = getCurrentContent();

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.sidebar}>
                    <h2>Ajuda</h2>
                    {Object.keys(helpContent).map((tab) => (
                        <div key={tab}>
                            <button
                                className={`${styles.tabButton} ${expandedTabs[tab] ? styles.expanded : ''}`}
                                onClick={() => toggleExpandTab(tab)}
                            >
                                {tab}
                                <span className={styles.arrow}>
                                    {expandedTabs[tab] ? '▲' : '▼'}
                                </span>
                            </button>
                            {expandedTabs[tab] && helpContent[tab].subTabs && (
                                <div className={styles.subTabContainer}>
                                    {Object.keys(helpContent[tab].subTabs).map((subTab) => (
                                        <button
                                            key={subTab}
                                            className={`${styles.subTabButton} ${currentTab === subTab && currentMainTab === tab ? styles.active : ''}`}
                                            onClick={() => handleTabChange(tab, subTab)}
                                        >
                                            {subTab}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.content}>
                    <h3>{title}</h3>
                    <div
                        className={styles.contentText}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
                <button className={styles.closeButton} onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default HelpModal;
