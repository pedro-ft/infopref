import React from 'react';
import OrderServiceItem from './OrderServiceItem';
import styles from './OrderServiceList.module.css';

function OrderServiceList({ data, currentPage, itemsPerPage, onOrderClick }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className={styles.orderServiceList}>
      <h2 className={styles.listTitle}>Lista Ordem de Serviços</h2>
      {currentItems.map((item) => (
        <OrderServiceItem key={item.id} {...item} 
        onClick={() => onOrderClick(item)}
        />
      ))}
    </section>
  );
}

export default OrderServiceList;
