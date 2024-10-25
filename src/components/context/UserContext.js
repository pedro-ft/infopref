import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from 'react';
import api from '../../api/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState('');

  const fetchUserProfile = async (userId) => {
    try {
      const response = await api.get(`/user/${userId}/profile`);
      if (response && response.data) {
        return response.data; // Assumindo que o backend retorna o tipo de perfil
      }
    } catch (error) {
      console.error('Erro ao buscar o perfil do usuário:', error);
    }
    return null;
  };

  const fetchUserDetails = async (userId, profileType) => {
    try {
      let response;
      if (profileType === 'TECNICO') {
        response = await api.get(`/tecnicos/usuario/${userId}`);
      } else if (profileType === 'SOLICITANTE') {
        response = await api.get(`/solicitantes/usuario/${userId}`);
      }

      if (response && response.data) {
        setRealName(response.data.nome); // Atualiza com o nome real
      }

    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
    }
  };

  useEffect(() => {
    const initializeUserFromToken = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const token = authToken.replace('Bearer ', '');
        const decodedToken = jwtDecode(token);
        const { sub: username, jti: userId } = decodedToken;

        // Reseta o nome real e perfil para evitar que permaneçam do usuário anterior
        setRealName('');
        setUserProfile('');

        setUsername(username); // Define o username padrão
        setIsAuthenticated(true);

        // Busca o perfil do usuário
        const profileType = await fetchUserProfile(userId);
        setUserProfile(profileType);

        // Se o perfil for TECNICO ou SOLICITANTE, busca o nome real
        if (profileType && profileType !== 'ADM') {
          await fetchUserDetails(userId, profileType); // Aguarda o nome ser carregado
        }
      }
    };

    initializeUserFromToken();
  }, [localStorage.getItem('authToken')]); // Substitua por `authToken`

  return (
    <UserContext.Provider value={{
      username, setUsername,
      realName, setRealName,
      avatarUrl, setAvatarUrl,
      isAuthenticated, setIsAuthenticated,
      userProfile, setUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};
