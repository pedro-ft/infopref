import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import InputGroup from './InputGroup';
import { UserContext } from '../context/UserContext'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUsername: setGlobalUsername, setAvatarUrl, setIsAuthenticated} = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const defaultPassword = '1234';
    const defaultUsername = 'Pedro Taborda';
    const defaultAvatarUrl = 'imagens/iconeTecnico.svg';

    const semADMPassword = '69';
    const semADMUsername = 'Jonas de Godoi';

    const solicitanteUsername = 'Leonardo Mulinari';
    const solicitantePassword = '4321';
    const solicitanteAvatarUrl = 'imagens/UsuarioIcone.svg';

    if (username === defaultUsername && password === defaultPassword) {
      setGlobalUsername(username);
      setAvatarUrl(defaultAvatarUrl);
      setIsAuthenticated(true);
      navigate('/menu');
    }else if (username === solicitanteUsername && password === solicitantePassword) {
      setGlobalUsername(username);
      setAvatarUrl(solicitanteAvatarUrl);
      setIsAuthenticated(true);
      navigate('/minhas-solicitacoes');
    } else if (username === semADMUsername && password === semADMPassword) {
      setGlobalUsername(username);
      setAvatarUrl(defaultAvatarUrl);
      setIsAuthenticated(true);
      navigate('/menu2');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <main className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <img className={styles.logo} src="imagens\LogoEmpresa.png" alt="Logo Empresa"></img>
        <InputGroup
          label="Usuário"
          iconSrc="imagens/iconeUsuario.svg"
          iconAlt="Icone Usuário"
          value={username}  // Passa o valor do username
          onChange={(e) => setUsername(e.target.value)}  // Atualiza o estado do username
        />
        <InputGroup
          label="Senha"
          iconSrc="imagens/iconeVisualizar.svg"
          iconAlt="Visualizar Icone"
          value={password}  // Passa o valor do password
          onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado do password
        />
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
