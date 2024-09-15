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
  const { setUsername: setGlobalUsername, setAvatarUrl, setIsAuthenticated} = useContext(UserContext);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fazendo a requisição POST para autenticar o usuário
      const response = await api.post('/login', {
        username: username,
        password: password
      });

      const authToken = response.headers.getAuthorization();
      const decoded = jwtDecode(authToken.slice(7));
      console.log(decoded);

      // Armazena o token JWT no localStorage
      localStorage.setItem('authToken', authToken);

      const userResponse = await api.get(`/user/${decoded.jti}`)
      console.log(userResponse.data);

      setIsAuthenticated(true);

      // Redireciona o usuário de acordo com o tipo de perfil
      if (userResponse.data.profile.includes("ADM")) {
        const defaultAvatarUrl = 'imagens/iconeTecnico.svg';
        setAvatarUrl(defaultAvatarUrl);
        navigate('/menu');
      } else if (userResponse.data.profile.includes("TECNICO")) {
        const defaultAvatarUrl = 'imagens/iconeTecnico.svg';
        setAvatarUrl(defaultAvatarUrl);
        navigate('/menu2');
      } else if (userResponse.data.profile.includes("SOLICITANTE")) {
        const defaultAvatarUrl = 'imagens/UsuarioIcone.svg';
        setAvatarUrl(defaultAvatarUrl);
        navigate('/minhas-solicitacoes');
      }
    } catch (err) {
      console.log(err)
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
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </main>
  );
}

export default LoginPage;
