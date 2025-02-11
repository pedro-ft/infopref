import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import Cabecalho from '../Cabecalho/Cabecalho';
import MenuItem from '../MenuPrincipal/MenuItem';
import styles from '../MenuPrincipal/MenuPrincipal.module.css';

const menuItems = [
  { text: 'Ordens de Serviço', link: '/osmenu' },
  { text: 'Solicitantes', link: '/solicitantes' },
  { text: 'Secretarias', link: '/secretarias' },
  { text: 'Departamentos', link: '/departamentos' },
  { text: 'Relatórios', link: '/relatorios' }
];

const MenuPrincipalSemADM = () => {
  const [ordensEmAberto, setOrdensEmAberto] = useState(0);
  const [ordensEmAndamento, setOrdensEmAndamento] = useState(0);
  const [ordensAguardando, setOrdensAguardando] = useState(0);
  const [ordensFinalizadasMes, setOrdensFinalizadasMes] = useState(0);
  const [ordensUrgentes, setOrdensUrgentes] = useState(0);

  useEffect(() => {
    api.get('/osmenu/count/status/EM_ABERTO')
      .then(response => setOrdensEmAberto(response.data))
      .catch(error => console.error(error));

    api.get('/osmenu/count/status/EM_ANDAMENTO')
      .then(response => setOrdensEmAndamento(response.data))
      .catch(error => console.error(error));

    api.get('/osmenu/count/status/AGUARDANDO_PEÇAS')
      .then(response => setOrdensAguardando(response.data))
      .catch(error => console.error(error));

    api.get('/osmenu/count/finalized-this-month')
      .then(response => setOrdensFinalizadasMes(response.data))
      .catch(error => console.error(error));

    api.get('/osmenu/count/urgent-not-finalized')
      .then(response => setOrdensUrgentes(response.data))
      .catch(error => console.error(error));
  }, []);
  return (
    <div className={styles.container}>
      <Cabecalho />
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <nav className={styles.menuOpcoes}>
            {menuItems.map((item, index) => (
              <Link to={item.link} key={index}>
                <MenuItem text={item.text} />
              </Link>
            ))}
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <div className={styles.cardsContainer}>
            <div className={styles.card}>Ordens em Aberto
              <span>{ordensEmAberto}</span></div>
            <div className={styles.card}>Ordens em Andamento
              <span>{ordensEmAndamento + ordensAguardando}</span></div>
            <div className={styles.card}>Ordens Finalizadas Este Mês
              <span>{ordensFinalizadasMes}</span></div>
            <div className={styles.card}>Ordens com Prioridade Urgente
              <span>{ordensUrgentes}</span></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuPrincipalSemADM;