// src/context/NetworkContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleOfflineSimulation = () => {
    setIsOfflineSimulated(prev => !prev);
  };

  const effectiveOnlineState = isOnline && !isOfflineSimulated;

  return (
    <NetworkContext.Provider
      value={{
        isOnline: effectiveOnlineState,
        isOfflineSimulated,
        toggleOfflineSimulation
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
