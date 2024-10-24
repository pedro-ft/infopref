import { format } from 'date-fns';
import React from 'react';
import OrderServiceItem from './OrderServiceItem';
import styles from './OrderServiceList.module.css';

function OrderServiceList({ data, currentPage, itemsPerPage, onOrderClick }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);
  const statusMapping = {
    AGUARDANDO_PEÇAS: "Aguardando peças",
    EM_ABERTO: "Em aberto",
    EM_ANDAMENTO: "Em andamento",
    FINALIZADO: "Finalizado",
  };
  const tipoChamadoMapping = {
    HARDWARE: "Hardware",
    SOFTWARE: "Software",
    REDE: "Rede",
    SEGURANCA: "Segurança",
    SUPORTE_GERAL: "Suporte Geral",
    MANUTENCAO_PREVENTIVA: "Manutenção Preventiva",
  };

  return (
    <section className={styles.orderServiceList}>
      <h2 className={styles.listTitle}>Lista Ordem de Serviços</h2>
      {currentItems.map((item) => (
        <OrderServiceItem key={item.id} openDate={item.data_abertura ? format(new Date(item.data_abertura), "dd/MM/yyyy") : ''}
          closeDate={item.data_finalizacao ? format(new Date(item.data_finalizacao), "dd/MM/yyyy") : ''}
          description={item.descricao}
          patrimonio={item.equipamentos.map(eq => eq.num_patrimonio).join(', ')}
          department={item.solicitante.departamento.nome}
          id={item.id}
          priority={item.prioridade}
          requester={item.solicitante.nome}
          resolucao={item.resolucao}
          secretariat={item.solicitante.departamento.secretaria.nome}
          status={statusMapping[item.status]}
          tecnico={item.tecnico?.nome}
          tipo_chamado={tipoChamadoMapping[item.tipo_chamado]}
          onClick={() => onOrderClick(item)}
        />
      ))}
    </section>
  );
}

export default OrderServiceList;
