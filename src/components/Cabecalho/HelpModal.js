// HelpModal.js
import React, { useState, useEffect } from 'react';
import styles from './HelpModal.module.css';

const helpContent = {
    'Ordens de Serviço': {
        title: 'Ajuda: Ordens de Serviço',
        content: 'Aqui estão as informações sobre a tela de Ordens de Serviço...'
    },
    'Nova Ordem de Serviço': {
        title: 'Ajuda: Nova Ordem de Serviço',
        content: 'Aqui estão as informações sobre a tela de Nova Ordem de Serviço...'
    },
    'Secretaria': {
        title: 'Ajuda: Secretaria',
        content: 'Aqui estão as informações sobre a tela de Secretaria...'
    },
    'Nova Secretaria': {
        title: 'Ajuda: Nova Secretaria',
        content: 'Aqui estão as informações sobre a tela de Nova Secretaria...'
    }
};

const HelpModal = ({ isOpen, onClose, initialTab }) => {
    const [currentTab, setCurrentTab] = useState(initialTab);

    useEffect(() => {
        setCurrentTab(initialTab);
    }, [initialTab]);

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.sidebar}>
                    <h2>Ajuda</h2>
                    {Object.keys(helpContent).map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.tabButton} ${currentTab === tab ? styles.active : ''}`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className={styles.content}>
                    <h3>{helpContent[currentTab]?.title}</h3>
                    <p>{helpContent[currentTab]?.content}</p>
                </div>
                <button className={styles.closeButton} onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default HelpModal;
