import React from 'react';
import styles from './Cabecalho.module.css'

const Cabecalho = () => {
return (
<header className={styles.header}>
    <img loading="lazy" src="imagens/LogoEmpresa.png" className={styles.logo} alt="Company logo" />
    <div className={styles.userInfo}>
        <div className={styles.userProfile}>
            <img loading="lazy" src="imagens/tecnico.svg" className={styles.avatar} alt="User avatar" />
            <span className={styles.userName}>Leonardo Mulinari</span>
        </div>
        <img loading="lazy" src="imagens/sair.svg" className={styles.notificationIcon} alt="Notification icon" />
    </div>
</header>
)
}

export default Cabecalho