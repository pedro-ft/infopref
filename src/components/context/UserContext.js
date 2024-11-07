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
        return response.data;
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
        setRealName(response.data.nome);
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

        setRealName('');
        setUserProfile('');

        setUsername(username);
        setIsAuthenticated(true);

        const profileType = await fetchUserProfile(userId);
        setUserProfile(profileType);

        if (profileType && profileType !== 'ADM') {
          await fetchUserDetails(userId, profileType);
        }
      }
    };

    initializeUserFromToken();
  }, [localStorage.getItem('authToken')]);

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
