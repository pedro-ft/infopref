import React from 'react';
import styles from './MenuPrincipal.module.css';
import MenuItem from './MenuItem';
import {Link} from 'react-router-dom';
import Cabecalho from '../Cabecalho/Cabecalho';

const menuItems = [
  'Ordens de Serviço',
  'Solicitantes',
  'Secretarias',
  'Departamentos',
  'Técnicos',
  'Relatórios'
];

const MenuPrincipal = () => {
  return (
    <main className={styles.menuPrincipal}>
      <Cabecalho />
      <h1 className={styles.menuTitle}>Menu</h1>
      <nav className={styles.menuOpcoes}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} text={item} />
        ))}
      </nav>
    </main>
  );
};

export default MenuPrincipal;