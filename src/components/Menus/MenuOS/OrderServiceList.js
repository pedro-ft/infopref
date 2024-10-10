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

  return (
    <section className={styles.orderServiceList}>
      <h2 className={styles.listTitle}>Lista Ordem de Serviços</h2>
      {currentItems.map((item) => (
        <OrderServiceItem key={item.id} openDate={format(item.data_abertura, "dd/MM/yyyy")}
          closeDate={format(item.data_finalizacao, "dd/MM/yyyy")}
          description={item.descricao}
          patrimonio={item.equipamentos?.at(0)?.name}
          department={item.solicitante.departamento.nome}
          id={item.id}
          priority={item.prioridade}
          requester={item.solicitante.nome}
          resolucao={item.resolucao}
          secretariat={item.solicitante.departamento.secretaria.nome}
          status={statusMapping[item.status]}
          tecnico={item.tecnico?.nome}
          tipoChamado={item.tipo_chamado}
          onClick={() => onOrderClick(item)}
        />
      ))}
    </section>
  );
}

export default OrderServiceList;
