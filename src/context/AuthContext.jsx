// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserProfile } from '../data/demoData';
import { validateUserId, validatePassword } from '../utils/validation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('nimmaBank_auth') === 'true';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('nimmaBank_userProfile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [sessionTimeoutWarning, setSessionTimeoutWarning] = useState(false);

  // Simulated session inactivity tracker (Optional test hook)
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      // Set warning after 5 minutes of total inactivity (for demo test, warning can trigger or be extended)
      timeout = setTimeout(() => {
        setSessionTimeoutWarning(true);
      }, 5 * 60 * 1000); 
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [isAuthenticated]);

  const login = (userId, password) => {
    const userIdError = validateUserId(userId);
    const passwordError = validatePassword(password);

    if (userIdError || passwordError) {
      return { success: false, message: userIdError || passwordError };
    }

    setIsAuthenticated(true);
    localStorage.setItem('nimmaBank_auth', 'true');
    setSessionTimeoutWarning(false);
    return { success: true };
  };

  const register = (name, userId, password) => {
    const newProfile = {
      ...initialUserProfile,
      name: { en: name, kn: name },
      userId: userId.toUpperCase()
    };
    setUserProfile(newProfile);
    localStorage.setItem('nimmaBank_userProfile', JSON.stringify(newProfile));
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nimmaBank_auth');
    setSessionTimeoutWarning(false);
  };

  const extendSession = () => {
    setSessionTimeoutWarning(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        login,
        register,
        logout,
        sessionTimeoutWarning,
        setSessionTimeoutWarning,
        extendSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
