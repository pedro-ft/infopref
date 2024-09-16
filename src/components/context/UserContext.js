// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  

  return (
    <UserContext.Provider value={{ username, setUsername, avatarUrl, setAvatarUrl, isAuthenticated, setIsAuthenticated, userProfile, setUserProfile}}>
      {children}
    </UserContext.Provider>
  );
};
