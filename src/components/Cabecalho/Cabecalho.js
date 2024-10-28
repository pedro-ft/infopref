// Cabecalho.js
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { UserContext } from '../context/UserContext';
import styles from './Cabecalho.module.css';
import HelpModal from './HelpModal';

const Cabecalho = () => {
  const { username, realName, avatarUrl, userProfile } = useContext(UserContext);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const urlCorreto = `/${avatarUrl}`;
  const navigate = useNavigate();
  const location = useLocation();

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleConfirmLogout = () => {
    closeLogoutModal();
    navigate('/');
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };


  const handlePasswordSave = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      await api.put('/user/change-password', {
        currentPassword,
        newPassword,
      }, {
        headers: {
          Authorization: authToken,
        }
      });

      alert("Senha alterada com sucesso!");
      closePasswordModal();
    } catch (error) {
      alert("Erro ao alterar a senha. Verifique a senha atual e tente novamente.");
      console.error(error);
    }
  };

  const displayName = userProfile === 'ADM' ? username : (realName || username);

  const getInitialHelpTab = () => {
    if (location.pathname.includes('ordens-de-servico')) return 'Ordens de Serviço';
    if (location.pathname.includes('nova-ordem-de-servico')) return 'Nova Ordem de Serviço';
    if (location.pathname.includes('secretaria')) return 'Secretaria';
    if (location.pathname.includes('nova-secretaria')) return 'Nova Secretaria';
    return 'Ordens de Serviço';
  };

  return (
    <>
      <header className={styles.header}>
        <img loading="lazy" src="/imagens/LogoEmpresa.png" className={styles.logo} alt="Company logo" />
        <div className={styles.userInfo}>
          <div className={styles.userProfile}>
            <img loading="lazy" src={urlCorreto} className={styles.avatar} alt="User avatar" />
            <span className={styles.userName}>{displayName}</span>
            {userProfile === 'SOLICITANTE' && (
              <button className={styles.changePasswordIcon} onClick={openPasswordModal} aria-label="Change Password">
                <img loading="lazy" src="/imagens/key-icon.svg" alt="Alterar Senha" />
              </button>
            )}
            <button className={styles.helpButton} onClick={openHelpModal} aria-label="Help">
              <img loading="lazy" src="/imagens/help.svg" alt="Alterar Senha" />
            </button>
          </div>
          <button className={styles.logoutIcon} onClick={openLogoutModal} aria-label="Logout">
            <img loading="lazy" src="/imagens/sair.svg" alt="Logout" />
          </button>
        </div>
      </header>

      {isPasswordModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Alterar Senha</h2>
            <label>Senha Atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label>Senha Nova</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={closePasswordModal}>Cancelar</button>
              <button className={styles.confirmButton} onClick={handlePasswordSave}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={closeHelpModal}
        initialTab={getInitialHelpTab()}
      />

      {isLogoutModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Logout</h2>
            <p>Tem certeza que deseja sair?</p>
            <div className={styles.modalActions}>
              <button onClick={closeLogoutModal} className={styles.cancelButton}>Não</button>
              <button onClick={handleConfirmLogout} className={styles.confirmButton}>Sim</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cabecalho;
