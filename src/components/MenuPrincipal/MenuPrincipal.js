import React from 'react';
import styles from './MenuPrincipal.module.css';
import MenuItem from './MenuItem';
import {Link} from 'react-router-dom';
import Cabecalho from '../Cabecalho/Cabecalho';

const menuItems = [
  { text: 'Ordens de Serviço', link: '/osmenu' },
  { text: 'Solicitantes', link: '/solicitantes' },
  { text: 'Secretarias', link: '/secretarias' },
  { text: 'Departamentos', link: '/departamentos' },
  { text: 'Técnicos', link: '/tecnicos' },
  { text: 'Relatórios', link: '/relatorios' }
];

const MenuPrincipal = () => {
  return (
    <main className={styles.menuPrincipal}>
      <Cabecalho />
      <h1 className={styles.menuTitle}>Menu</h1>
      <nav className={styles.menuOpcoes}>
        {menuItems.map((item, index) => (
        <Link to={item.link} key={index}>
        <MenuItem text={item.text} />
      </Link>
    ))}
      </nav>
    </main>
  );
};

export default MenuPrincipal;