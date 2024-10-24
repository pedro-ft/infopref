import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { UserContext } from '../context/UserContext';
import styles from './Cabecalho.module.css';

const Cabecalho = () => {
  const { username, avatarUrl } = useContext(UserContext);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const urlCorreto = `/${avatarUrl}`;
  const navigate = useNavigate();

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
    navigate('/'); // Redireciona para a página de login
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

  return (
    <>
      <header className={styles.header}>
        <img loading="lazy" src="/imagens/LogoEmpresa.png" className={styles.logo} alt="Company logo" />
        <div className={styles.userInfo}>
          <div className={styles.userProfile}>
            <img loading="lazy" src={urlCorreto} className={styles.avatar} alt="User avatar" />
            <span className={styles.userName}>{username}</span>
            <button className={styles.changePasswordIcon} onClick={openPasswordModal} aria-label="Change Password">
              <img loading="lazy" src="/imagens/key-icon.svg" alt="Alterar Senha" />
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
