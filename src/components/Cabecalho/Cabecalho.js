import React, { useContext } from 'react';
import styles from './Cabecalho.module.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Cabecalho = () => {
  const { username } = useContext(UserContext);
return (
<header className={styles.header}>
    <img loading="lazy" src="imagens/LogoEmpresa.png" className={styles.logo} alt="Company logo" />
    <div className={styles.userInfo}>
        <div className={styles.userProfile}>
            <img loading="lazy" src="imagens/iconeTecnico.svg" className={styles.avatar} alt="User avatar" />
            <span className={styles.userName}>{username}</span>
        </div>
        <Link to="/" className={styles.logoutButton}>
          <button className={styles.logoutIcon} aria-label="Logout">
            <img loading="lazy" src="imagens/sair.svg" alt="Logout" />
          </button>
        </Link>
    </div>
</header>
)
}

export default Cabecalho