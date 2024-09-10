import React from 'react';
import OrderServiceItem from './OrderServiceItem';
import styles from './OrderServiceList.module.css';

const orderServiceData = [
  {
    id: '987654321',
    status: 'Em andamento',
    openDate: '27/05/2024',
    assetNumber: '21009826',
    priority: 'Urgente',
    requester: 'Pedro Ferreira Taborda',
    department: 'Administração',
    secretariat: 'Administração',
    description: 'Tela não da imagem'
  },
  {
    id: '123456789',
    status: 'Finalizada',
    openDate: '22/05/2024',
    closeDate: '23/05/2024',
    assetNumber: '21007526',
    requester: 'Leonardo Mulinari',
    department: 'Educação e Cultura',
    secretariat: 'Educação e Cultura',
    description: 'Entrada USB do dispositivo não funciona.'
  },
  {
    id: '543216789',
    status: 'Finalizada',
    openDate: '16/05/2024',
    closeDate: '18/05/2024',
    assetNumber: '18001243',
    requester: 'Jonas de Godoi',
    department: 'Saúde',
    secretariat: 'Saúde',
    description: 'Roteador Wi-Fi não funciona corretamente.'
  },
];

function OrderServiceList() {
  return (
    <section className={styles.orderServiceList}>
      <h2 className={styles.listTitle}>Lista Ordem de Serviços</h2>
      {orderServiceData.map((item) => (
        <OrderServiceItem key={item.id} {...item} />
      ))}
    </section>
  );
}

export default OrderServiceList;