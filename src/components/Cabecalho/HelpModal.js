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
                    <li><strong>Descrição</strong>: Descrição do problema na ordem de serviço.
                    <li><strong>Resolução</strong>: Detalhes da resolução do problema na ordem de serviço.
                    </ul>
                </br>

                <p><strong>Edição e Exclusão</strong></p>
                <p>Na tela de Ordens de Serviço, ao clicar em uma ordem específica, é possível visualizar e editar seus atributos, como status, prioridade e outros detalhes relevantes. Além disso, a aplicação permite que você exclua a ordem de serviço, caso seja necessário removê-la do sistema. </p>
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
                content: `
<p>Para criar uma nova ordem de serviço (O.S.), preencha todos os campos obrigatórios com as informações relevantes sobre o chamado. Os campos obrigatórios são indicados por um asterisco ao lado do nome e incluem:</p>
<ul>
    <li><strong>Data de Abertura</strong>: Data em que a O.S. está sendo registrada.</li>
    <li><strong>Nome Solicitante</strong>: Nome do solicitante que abriu o chamado.</li>
    <li><strong>Tipo de Chamado</strong>: Categoria da solicitação (por exemplo, Hardware, Rede).</li>
    <li><strong>Status</strong>: Estado atual do chamado (como Em Andamento ou Finalizado).</li>
    <li><strong>Prioridade</strong>: Nível de prioridade do chamado (por exemplo, Urgente, Normal).</li>
    <li><strong>Técnico</strong>: Técnico designado para atender a solicitação.</li>
</ul>

<p>Os campos não obrigatórios são:</p>
<ul>
    <li><strong>Data de Finalização</strong>: Data de conclusão da O.S., caso aplicável.</li>
    <li><strong>Descrição</strong>: Detalhes adicionais sobre o problema ou a solicitação.</li>
    <li><strong>Resolução</strong>: Informação sobre a solução aplicada, se já houver uma resolução.</li>
</ul>

<p>Depois de preencher os campos necessários, clique em <strong>Próximo</strong> para avançar para a segunda etapa da criação da ordem de serviço. Nesta etapa, você deverá informar:</p>
<ul>
    <li><strong>Quantidade de Equipamentos</strong>: Número de equipamentos relacionados ao chamado.</li>
    <li><strong>Números de Patrimônio</strong>: Para cada equipamento, insira o número de patrimônio correspondente. Este campo é obrigatório.</li>
</ul>

<p>Ao concluir o preenchimento, clique em <strong>Salvar</strong> para criar a ordem de serviço. A Ordem será então exibida na tela principal de ordens de serviço.</p>

<p>Se precisar alterar alguma informação antes de salvar ou caso deseje sair da criação de uma nova O.S., você pode clicar no botão <strong>Voltar</strong> para retornar à tela anterior ou ao menu principal de ordens de serviço.</p>
</br>
`
            },
            'Ordens de Serviço Solicitadas': {
                title: 'Ajuda: Ordens de Serviço Solicitadas',
                content: `
<p>Nesta tela, você pode visualizar todas as ordens de serviço que estão com o status <em>Em Aberto</em>, aguardando a aceitação de um técnico. Cada ordem exibe informações preenchidas pelo solicitante, incluindo:</p>
<ul>
    <li><strong>Data de Abertura</strong>: A data em que o solicitante solicitou a ordem, preenchida automaticamente pelo sistema.</li>
    <li><strong>Número de Patrimônio</strong>: Número de patrimônio dos equipamentos associados à ordem de serviço.</li>
    <li><strong>Descrição</strong>: Detalhamento do problema ou serviço solicitado.</li>
    <li><strong>Solicitante</strong>: Nome do solicitante que pediu a ordem de serviço.</li>
    <li><strong>Secretaria e Departamento</strong>: Secretaria e departamento aos quais o solicitante pertence.</li>
</ul>

<p><strong>Ações Disponíveis</strong></p>
<ul>
    <li><strong>Aceitar</strong>: Ao clicar em <em>Aceitar</em>, uma nova tela é aberta para que você preencha as seguintes informações:
        <ul>
            <li><strong>Técnico</strong>: Selecione o técnico responsável pela ordem de serviço.</li>
            <li><strong>Prioridade</strong>: Defina a prioridade da ordem de serviço.</li>
            <li><strong>Tipo de Chamado</strong>: Escolha o tipo de chamado referente à solicitação.</li>
        </ul>
        Após preencher esses campos e clicar em <em>Aceitar</em>, a ordem será movida para o status <em>Em Andamento</em> e ficará disponível na tela principal de ordens de serviço.
    </li>
    <li><strong>Rejeitar</strong>: Ao clicar em <em>Rejeitar</em>, será exibida uma mensagem de confirmação para garantir que deseja rejeitar a ordem. Caso confirme, a ordem será rejeitada e excluída do sistema.</li>
</ul>
<br>
`
            }
        }
    },
    'Solicitante': {
        title: 'Ajuda: Solicitante',
        content: 'Aqui estão as informações sobre a tela de Solicitante...',
        subTabs: {
            'Solicitante': {
                title: 'Ajuda: Solicitante',
                content: `
<p>Nesta tela, você pode visualizar todos os solicitantes cadastrados no sistema em formato de cards. Cada card exibe as seguintes informações sobre o solicitante:</p>
<ul>
    <li><strong>Nome: Nome do Solicitante</strong></li>
    <li><strong>Secretaria</strong>: Secretaria à qual o solicitante pertence</li>
    <li><strong>Departamento</strong>: Departamento da secretaria ao qual o solicitante é associado</li>
    <li><strong>Fone</strong>: Telefone de contato do solicitante</li>
    <li><strong>ID de Acesso Remoto</strong>: Identificação para acesso remoto via AnyDesk</li>
</ul>

<p><strong>Ações Disponíveis</strong></p>
<ul>
    <li><strong>Redefinir Senha</strong>: Utilize este botão caso o solicitante tenha esquecido a senha ou precise redefini-la. Ao clicar, será solicitado que você insira a nova senha e confirme a ação.</li>
    <li><strong>Editar</strong> (ícone de lápis): Clique neste botão para editar as informações do solicitante, como nome, telefone, ID de acesso remoto e departamento.</li>
    <li><strong>Excluir</strong> (ícone de X): Clique neste botão para excluir o solicitante do sistema. Uma mensagem de confirmação será exibida para garantir a exclusão. Obs.: O solicitante só pode ser excluído se não houver nenhuma ordem de serviço associada a ele.</li>
</ul>

<p><strong>Funcionalidades Adicionais</strong></p>
<ul>
    <li><strong>Barra de Pesquisa</strong>: Permite buscar solicitantes pelo nome.</li>
    <li><strong>Opções de Ordenação</strong>: Disponíveis na barra de pesquisa, para organizar a lista de solicitantes por critérios como ordem alfabética, secretaria, departamento, mais recente e mais antigo.</li>
</ul>

<p><strong>Botão Novo Solicitante</strong>: Clique para adicionar um novo solicitante ao sistema. Você será redirecionado para uma tela de cadastro.</p>

<p><strong>Navegação de Páginas</strong></p>
<p>Na parte inferior da tela, você encontrará botões de navegação que permitem avançar ou retroceder entre as páginas de solicitantes.</p>
<br>
`
            },
            'Nova Solicitante': {
                title: 'Ajuda: Nova Solicitante',
                content: `
<p>Nesta tela, o usuário pode cadastrar um novo solicitante no sistema. Para isso, é necessário preencher todos os campos obrigatórios e, em seguida, clicar em <strong>Salvar</strong>.</p>

<p><strong>Campos Obrigatórios</strong> (identificados com um asterisco):</p>
<ul>
    <li><strong>Nome</strong>: Nome completo do solicitante.</li>
    <li><strong>Departamento</strong>: Departamento ao qual o solicitante pertence.</li>
    <li><strong>Usuário</strong> (login): Nome de usuário para login no sistema.</li>
    <li><strong>Senha</strong>: Deve conter entre 5 e 20 caracteres, incluindo pelo menos uma letra e um número.</li>
</ul>

<p><strong>Campos Opcionais</strong>:</p>
<ul>
    <li><strong>Fone</strong>: Telefone de contato do solicitante.</li>
    <li><strong>ID de Acesso Remoto</strong>: Identificação para acesso remoto via AnyDesk.</li>
</ul>

<p><strong>Ações Disponíveis</strong></p>
<ul>
    <li><strong>Salvar</strong>: Após preencher todos os campos obrigatórios, clique em <strong>Salvar</strong> para concluir o cadastro do solicitante.</li>
</ul>

<p>Certifique-se de que todos os dados estão corretos antes de salvar, pois isso garantirá que o solicitante tenha acesso ao sistema com as informações adequadas.</p>
<br>
`
            }
        }
    },
    'Secretaria': {
        title: 'Ajuda: Secretaria',
        content: 'Aqui estão as informações sobre a tela de Secretaria...',
        subTabs: {
            'Secretaria': {
                title: 'Ajuda: Secretaria',
                content: `
<p>Nesta tela, o usuário pode visualizar, editar e excluir as secretarias cadastradas no sistema. As secretarias são exibidas em formato de <strong>cards</strong>, e cada card contém as principais informações da secretaria e opções de ação.</p>

<p><strong>Informações em cada Card</strong>:</p>
<ul>
    <li><strong>Nome</strong>: Nome da secretaria.</li>
    <li><strong>Fone</strong>: Telefone de contato da secretaria.</li>
</ul>

<p><strong>Ações Disponíveis</strong>:</p>
<ul>
    <li><strong>Editar</strong>: Representado pelo ícone de um lápis, permite que o usuário edite o nome e o telefone da secretaria.</li>
    <li><strong>Excluir</strong>: Representado pelo ícone de um "X", permite a exclusão da secretaria. Ao clicar em excluir, uma mensagem de confirmação será exibida para garantir a intenção de exclusão. A exclusão só será possível se a secretaria não estiver associada a nenhum departamento.</li>
</ul>

<p><strong>Funcionalidades da Tela</strong>:</p>
<ul>
    <li><strong>Barra de Pesquisa</strong>: Permite ao usuário buscar uma secretaria pelo nome.</li>
        <li><strong>Opções de Ordenação</strong>: Disponíveis na barra de pesquisa, para organizar a lista de secretarias por critérios como ordem alfabética, mais recente e mais antigo.</li>

</ul>
    <p><strong>Botão "Nova Secretaria"</strong>: Localizado no topo da tela, permite o cadastro de uma nova secretaria. Ao clicar, o usuário será redirecionado para a tela de cadastro de secretaria.</p>

<p><strong>Navegação entre Páginas</strong></p>
<p>Na parte inferior da tela, você encontrará botões de navegação para avançar ou retroceder entre as páginas de secretarias.</p>
<br>
`
            },

            'Nova Secretaria': {
                title: 'Ajuda: Nova Secretaria',
                content: `
<p>Nesta tela, o usuário pode cadastrar uma nova secretaria no sistema, preenchendo as informações obrigatórias e opcionais.</p>

<p><strong>Campos do Formulário</strong>:</p>
<ul>
    <li><strong>Nome*</strong>: Nome da secretaria. Este é um campo <strong>obrigatório</strong> e está marcado com um asterisco (*).</li>
    <li><strong>Fone</strong>: Telefone de contato da secretaria. Este campo é <strong>opcional</strong>.</li>
</ul>

<p><strong>Instruções de Uso</strong>:</p>
<p>Preencha o campo obrigatório <strong>Nome</strong> e, caso desejado, o campo <strong>Fone</strong>. Após preencher as informações, clique no botão <strong>Salvar</strong> para cadastrar a nova secretaria.</p>

<p>Ao salvar, a secretaria será adicionada ao sistema e estará disponível na lista de secretarias.</p>
<br>
`
            }
        }
    },
    'Departamento': {
        title: 'Ajuda: Departamento',
        content: 'Aqui estão as informações sobre a tela de Departamento...',
        subTabs: {
            'Departamento': {
                title: 'Ajuda: Departamento',
                content: `
<p>Esta tela lista todos os departamentos cadastrados no sistema em formato de cards, permitindo ao usuário visualizar, pesquisar, editar e excluir departamentos, além de acessar informações detalhadas sobre os equipamentos e informações de internet associados a cada departamento.</p>

<p><strong>Conteúdo dos Cards de Departamentos</strong>:</p>
<ul>
    <li><strong>Nome</strong>: Nome do departamento.</li>
    <li><strong>Fone</strong>: Telefone de contato do departamento.</li>
</ul>

<p>Cada card inclui os seguintes botões e opções:</p>
<ul>
    <li><strong>Editar</strong>: Representado por um ícone de lápis, permite editar o nome e telefone do departamento.</li>
    <li><strong>Excluir</strong>: Representado por um ícone de "X", permite excluir o departamento. Será exibida uma mensagem de confirmação, pois o departamento só pode ser excluído se não estiver associado a nenhum equipamento ou informação de internet.</li>
    <li><strong>Equipamentos</strong>: Redireciona o usuário para a tela que lista os equipamentos associados ao departamento.</li>
    <li><strong>Informações de Internet</strong>: Redireciona o usuário para a tela com as informações de internet associadas ao departamento.</li>
</ul>

<p><strong>Outras Funcionalidades</strong>:</p>
<ul>
    
    <li><strong>Barra de Pesquisa</strong>: Permite ao usuário buscar um departamento pelo nome.</li>
     <li><strong>Opções de Ordenação</strong>: Disponíveis na barra de pesquisa, para organizar a lista de departamentos por critérios como ordem alfabética, mais recente e mais antigo.</li>
     </ul>
    <p><strong>Novo Departamento</strong>: Para cadastrar um novo departamento, clique no botão <strong>‘Novo Departamento’</strong>. Isso redirecionará para a tela de cadastro de departamentos, onde você poderá inserir as informações do novo departamento.</p>            

    <p><strong>Navegação por Páginas</strong>: Na parte inferior da tela, você encontrará botões para avançar ou retroceder entre as páginas de departamentos.</p>


`
            },

            'Novo Departamento': {
                title: 'Ajuda: Novo Departamento',
                content: `<p>Nesta tela, o usuário pode cadastrar um novo departamento no sistema, preenchendo as informações obrigatórias e opcionais.</p>

<p><strong>Campos do Formulário</strong>:</p>
<ul>
    <li><strong>Nome*</strong>: Nome do departamento. Este é um campo <strong>obrigatório</strong> e está marcado com um asterisco (*).</li>
    <li><strong>Fone</strong>: Telefone de contato do departamento. Este campo é <strong>opcional</strong>.</li>
    <li><strong>Secretaria*</strong>: Secretaria a qual o departamento será associado. Este é um campo <strong>obrigatório</strong> e está marcado com um asterisco (*).</li>
</ul>

<p><strong>Instruções de Uso</strong>:</p>
<p>Preencha os campos obrigatórios <strong>Nome</strong> e <strong>Secretaria</strong> e, caso desejado, o campo <strong>Fone</strong>. Após preencher as informações, clique no botão <strong>Salvar</strong> para cadastrar o novo departamento.</p>

<p>Ao salvar, o departamento será adicionado ao sistema e estará disponível na lista de departamentos.</p>
<br>`
            }
        }
    },
    'Equipamentos': {
        title: 'Ajuda: Equipamentos',
        content: 'Aqui estão as informações sobre a tela de Equipamentos...',
        subTabs: {
            'Equipamentos': {
                title: 'Ajuda: Equipamentos',
                content: `
<p>Esta tela exibe todos os equipamentos associados a um determinado departamento em formato de cards, permitindo ao usuário visualizar, pesquisar, editar e excluir equipamentos, além de alterar o departamento ao qual cada equipamento está vinculado.</p>

<p><strong>Conteúdo dos Cards de Equipamentos</strong>:</p>
<ul>
    <li><strong>Nº de Patrimônio</strong>: Número de identificação do equipamento.</li>
    <li><strong>Modelo</strong>: Modelo do equipamento.</li>
    <li><strong>Marca</strong>: Marca do equipamento.</li>
    <li><strong>Descrição Técnica</strong>: Descrição técnica detalhada do equipamento.</li>
    <li><strong>Data de Aquisição</strong>: Data em que o equipamento foi adquirido pelo departamento.</li>
</ul>

<p>Cada card inclui os seguintes botões e opções:</p>
<ul>
    <li><strong>Editar</strong>: Representado por um ícone de lápis, permite editar o <strong>modelo</strong>, <strong>marca</strong> e <strong>descrição técnica</strong> do equipamento.</li>
    <li><strong>Excluir</strong>: Representado por um ícone de "X", permite excluir o equipamento. Ao clicar, será exibida uma mensagem de confirmação antes de concluir a exclusão.</li>
    <li><strong>Alterar Departamento</strong>: Permite transferir o equipamento para outro departamento. Ao clicar, o usuário deve selecionar o novo departamento, informar a nova data de aquisição e, em seguida, clicar em salvar para confirmar a alteração.</li>
</ul>

<p><strong>Outras Funcionalidades</strong>:</p>
<ul>
    <li><strong>Barra de Pesquisa</strong>: Permite ao usuário buscar equipamentos pelo número de patrimônio.</li>
         <li><strong>Opções de Ordenação</strong>: Disponíveis na barra de pesquisa, para organizar a lista de equipamentos por critérios como mais recente, mais antigo, data de aquisição, marca e número de patrimônio.</li>

</ul>

<p><strong>Novo Equipamento</strong>:</p>
<p>Para cadastrar um novo equipamento, clique no botão <strong>‘Novo Equipamento’</strong>. Isso redirecionará para a tela de cadastro de equipamentos, onde você poderá inserir as informações do novo equipamento.</p>

<p><strong>Navegação por Páginas</strong>:</p>
<p>Na parte inferior da tela, você encontrará botões para avançar ou retroceder entre as páginas de equipamentos.</p>
<br>
`
            },

            'Novo Equipamento': {
                title: 'Ajuda: Novo Equipamento',
                content: `<p>Nesta tela, o usuário pode cadastrar um novo equipamento no sistema, preenchendo as informações obrigatórias e opcionais.</p>

<p><strong>Campos do Formulário</strong>:</p>
<ul>
    <li><strong>Número de Patrimônio*</strong>: Número de identificação do equipamento. Este é um campo <strong>obrigatório</strong> e está marcado com um asterisco (*).</li>
    <li><strong>Modelo</strong>: Modelo do equipamento. Este campo é <strong>opcional</strong>.</li>
    <li><strong>Marca</strong>: Marca do equipamento. Este campo é <strong>opcional</strong>.</li> 
    <li><strong>Descrição Técnica</strong>: Descrição técnica detalhada do equipamento. Este campo é <strong>opcional</strong>.</li>
    <li><strong>Data de Aquisição</strong>: Data em que o equipamento foi adquirido pelo departamento. Este campo é <strong>opcional</strong>.</li>
</ul>

<p><strong>Instruções de Uso</strong>:</p>
<p>Preencha o campo obrigatório <strong>Número de Patrimônio</strong> e, caso desejado, os campos <strong>Modelo</strong>, <strong>Marca</strong>, <strong>Descrição Técnica</strong> e  <strong>Data de Aquisição</strong>. Após preencher as informações, clique no botão <strong>Salvar</strong> para cadastrar o novo equipamento.</p>

<p>Ao salvar, o equipamento será adicionado ao sistema e estará disponível na lista de equipamentos.</p>`
            }
        }
    },

    'Informações de Internet': {
        title: 'Ajuda: Informações de Internet',
        content: 'Aqui estão as informações sobre a tela de Informações de Internet...',
        subTabs: {
            'Informações de Internet': {
                title: 'Ajuda: Informações de Internet',
                content: `<p>Esta tela exibe todos as informações de internet associadas a um determinado departamento em formato de cards, permitindo ao usuário visualizar, pesquisar, editar e excluir informações de internet.</p>

<p><strong>Conteúdo dos Cards de Informações de Internet</strong>:</p>
<ul>
    <li><strong>Nome da Rede</strong>: Nome da Rede.</li>
    <li><strong>Senha</strong>: Senha da Rede.</li>
    <li><strong>IP</strong>: IP da Rede.</li>
</ul>

<p>Cada card inclui os seguintes botões e opções:</p>
<ul>
    <li><strong>Editar</strong>: Representado por um ícone de lápis, permite editar o <strong>Nome da Rede</strong>, <strong>Senha</strong> e <strong>IP</strong> da informação de internet.</li>
    <li><strong>Excluir</strong>: Representado por um ícone de "X", permite excluir a informação de internet. Ao clicar, será exibida uma mensagem de confirmação antes de concluir a exclusão.</li>
</ul>

<p><strong>Outras Funcionalidades</strong>:</p>
<ul>
    <li><strong>Barra de Pesquisa</strong>: Permite ao usuário buscar informações de internet pelo nome da rede.</li>
         <li><strong>Opções de Ordenação</strong>: Disponíveis na barra de pesquisa, para organizar a lista de informações de internet por critérios como mais recente, mais antigo e nome da rede.</li>

</ul>

<p><strong>Novo Equipamento</strong>:</p>
<p>Para cadastrar uma nova informação de internet, clique no botão <strong>‘Nova Informação de Internet’</strong>. Isso redirecionará para a tela de cadastro de informações de internet, onde você poderá inserir as informações da nova informação de internet.</p>

<p><strong>Navegação por Páginas</strong>:</p>
<p>Na parte inferior da tela, você encontrará botões para avançar ou retroceder entre as páginas de informações de internet.</p>
<br>`
            },

            'Nova Informação de Internet': {
                title: 'Ajuda: Nova Informação de Internet',
                content: `<p>Nesta tela, o usuário pode cadastrar uma nova informação de internet no sistema, preenchendo as informações obrigatórias e opcionais.</p>

<p><strong>Campos do Formulário</strong>:</p>
<ul>
    <li><strong>Nome da Rede*</strong>: Nome da Rede. Este é um campo <strong>obrigatório</strong> e está marcado com um asterisco (*).</li>
    <li><strong>Senha</strong>: Senha da Rede. Este é um campo <strong>obrigatório</strong> e está marcado com um asterisco (*).</li>
    <li><strong>IP</strong>: IP da rede. Este campo é <strong>opcional</strong>.</li> 
</ul>

<p><strong>Instruções de Uso</strong>:</p>
<p>Preencha os campos obrigatórios <strong>Nome da Rede</strong> e <strong>Senha</strong> e, caso desejado, o campo <strong>IP</strong>. Após preencher as informações, clique no botão <strong>Salvar</strong> para cadastrar a nova informação de internet.</p>

<p>Ao salvar, a informação de internet será adicionada ao sistema e estará disponível na lista de informações de internet.</p>`
            }
        }
    },

    'Técnicos': {
        title: 'Ajuda: Técnicos',
        content: 'Aqui estão as informações sobre a tela de Técnicos...',
        subTabs: {
            'Técnicos': {
                title: 'Ajuda: Técnicos',
                content: `
<p>Esta tela lista todos os técnicos cadastrados no sistema em formato de cards, permitindo ao usuário visualizar, pesquisar, editar e excluir técnicos.</p>

<p><strong>Conteúdo dos Cards de Técnicos</strong>:</p>
<ul>
    <li><strong>Nome</strong>: Nome do técnico.</li>
    <li><strong>Fone</strong>: Telefone de contato do técnico.</li>
</ul>

<p>Cada card inclui os seguintes botões e opções:</p>
<ul>
    <li><strong>Editar</strong>: Representado por um ícone de lápis, permite editar o nome e telefone do técnico.</li>
    <li><strong>Excluir</strong>: Representado por um ícone de "X", permite excluir o técnico. Será exibida uma mensagem de confirmação, pois o técnico só pode ser excluído se não estiver associado a nenhuma ordem de serviço.</li>
</ul>

<p><strong>Outras Funcionalidades</strong>:</p>
<ul>
    
    <li><strong>Barra de Pesquisa</strong>: Permite ao usuário buscar um técnico pelo nome.</li>
     <li><strong>Opções de Ordenação</strong>: Disponíveis na barra de pesquisa, para organizar a lista de técnicos por critérios como ordem alfabética, mais recente e mais antigo.</li>
     </ul>
    <p><strong>Novo Técnico</strong>: Para cadastrar um novo técnico, clique no botão <strong>‘Novo Técnico’</strong>. Isso redirecionará para a tela de cadastro de técnicos, onde você poderá inserir as informações do novo técnico.</p>            

    <p><strong>Navegação por Páginas</strong>: Na parte inferior da tela, você encontrará botões para avançar ou retroceder entre as páginas de técnicos.</p>


`
            },

            'Novo Técnico': {
                title: 'Ajuda: Novo Técnico',
                content: `
<p>Nesta tela, o usuário pode cadastrar um novo Técnico no sistema. Para isso, é necessário preencher todos os campos obrigatórios e, em seguida, clicar em <strong>Salvar</strong>.</p>

<p><strong>Campos Obrigatórios</strong> (identificados com um asterisco):</p>
<ul>
    <li><strong>Nome</strong>: Nome completo do Técnico.</li>
    <li><strong>Usuário</strong> (login): Nome de usuário para login no sistema.</li>
    <li><strong>Senha</strong>: Deve conter entre 5 e 20 caracteres, incluindo pelo menos uma letra e um número.</li>
</ul>

<p><strong>Campos Opcionais</strong>:</p>
<ul>
    <li><strong>Fone</strong>: Telefone de contato do técnico.</li>
</ul>

<p><strong>Ações Disponíveis</strong></p>
<ul>
    <li><strong>Salvar</strong>: Após preencher todos os campos obrigatórios, clique em <strong>Salvar</strong> para concluir o cadastro do técnico.</li>
</ul>

<p>Certifique-se de que todos os dados estão corretos antes de salvar, pois isso garantirá que o técnico tenha acesso ao sistema com as informações adequadas.</p>
<br>
`
            }
        }
    },
    'Relatórios': {
        title: 'Ajuda: Relatórios',
        content: 'Aqui estão as informações sobre a tela de Relatórios...',
        subTabs: {
            'Relatórios': {
                title: 'Ajuda: Relatórios',
                content: `<p>Esta tela permite a geração de relatórios de ordens de serviço em formato PDF, com filtros e período específicos. O usuário pode visualizar, salvar ou imprimir o relatório gerado.</p>

<p><strong>Passos para gerar o relatório</strong>:</p>
<ul>
    <li><strong>Seleção do Período</strong>: Preencha as datas de início e fim do período que deseja analisar. Apenas ordens de serviço dentro desse intervalo serão incluídas no relatório.</li>
    <li><strong>Filtro do Relatório</strong>: Selecione o critério principal para o relatório na opção <em>“Relatório por”</em>, podendo escolher entre:
        <ul>
            <li><strong>Solicitante</strong>: Gerar relatório para ordens de um solicitante específico.</li>
            <li><strong>Secretaria</strong>: Gerar relatório para ordens de uma secretaria específica.</li>
            <li><strong>Departamento</strong>: Gerar relatório para ordens de um departamento específico.</li>
            <li><strong>Técnico</strong>: Gerar relatório para ordens de um técnico específico.</li>
            <li><strong>Tipo de Chamado</strong>: Gerar relatório para um tipo de chamado específico.</li>
        </ul>
    </li>
    <li><strong>Detalhe do Filtro</strong>: Após selecionar o critério principal, uma nova opção aparecerá para definir um valor específico para o filtro escolhido. Por exemplo, ao escolher "Solicitante", será possível selecionar o nome do solicitante desejado.</li>
    <li><strong>Gerar Relatório</strong>: Clique no botão <strong>“Gerar Relatório”</strong> após definir o período e os filtros. Uma nova guia será aberta com o relatório em PDF.</li>
</ul>

<p><strong>Relatório em PDF</strong>:</p>
<ul>
    <li>O PDF exibirá todas as ordens de serviço que correspondem ao período e aos filtros selecionados.</li>
    <li>O usuário poderá visualizar, baixar ou imprimir o relatório diretamente da nova guia.</li>
</ul>
`
            },
        }
    },
};

// Mapeamento entre URLs e abas/sub-abas do modal
const urlToHelpTab = {
    '/menu': { tab: 'Menu Principal', subTab: 'Menu Principal' },
    '/osmenu': { tab: 'Ordem de Serviço', subTab: 'Ordem de Serviço' },
    '/novaos': { tab: 'Ordem de Serviço', subTab: 'Nova Ordem de Serviço' },
    '/selecionar-equipamentos': { tab: 'Ordem de Serviço', subTab: 'Nova Ordem de Serviço' },
    '/osSolicitadas': { tab: 'Ordem de Serviço', subTab: 'Ordens de Serviço Solicitadas' },
    '/solicitantes': { tab: 'Solicitante', subTab: 'Solicitante' },
    '/novo-solicitante': { tab: 'Solicitante', subTab: 'Nova Solicitante' },
    '/secretarias': { tab: 'Secretaria', subTab: 'Secretaria' },
    '/nova-secretaria': { tab: 'Secretaria', subTab: 'Nova Secretaria' },
    '/departamentos': { tab: 'Departamento', subTab: 'Departamento' },
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
