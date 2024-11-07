import { jwtDecode } from "jwt-decode";
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import InputGroup from './InputGroup';
import api from "../../api/api";
import { UserContext } from '../context/UserContext'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUsername: setGlobalUsername, setAvatarUrl, setIsAuthenticated, setUserProfile } = useContext(UserContext);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', {
        username: username,
        password: password
      });

      const authToken = response.headers.getAuthorization();
      const decoded = jwtDecode(authToken.slice(7));
      localStorage.setItem('authToken', authToken);

      const userResponse = await api.get(`/user/${decoded.jti}`)

      setIsAuthenticated(true);
      setGlobalUsername(userResponse.data.username);
      setUserProfile(userResponse.data.profile);
      const defaultAvatarUrl = userResponse.data.profile.includes("ADM") ? 'imagens/iconeTecnico.svg' :
        userResponse.data.profile.includes("TECNICO") ? 'imagens/iconeTecnico.svg' :
          'imagens/UsuarioIcone.svg';
      setAvatarUrl(defaultAvatarUrl);

      if (userResponse.data.profile.includes("ADM")) {
        navigate('/menu');
      } else if (userResponse.data.profile.includes("TECNICO")) {
        navigate('/menu2');
      } else if (userResponse.data.profile.includes("SOLICITANTE")) {
        navigate('/minhas-solicitacoes');
      }
    } catch (err) {
      setError('Usuário ou senha inválidos');
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputGroup
          label="Senha"
          iconSrc="imagens/iconeVisualizar.svg"
          iconAlt="Visualizar Icone"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </main>
  );
}

export default LoginPage;
