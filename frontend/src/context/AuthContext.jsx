import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser({ email: 'user@example.com', name: 'User' });
        }
      } else {
        setUser({ email: 'user@example.com', name: 'User' });
      }
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    const dummyToken = 'mock-jwt-token-12345';
    const dummyUser = { email, name: email.split('@')[0] };
    
    localStorage.setItem('authToken', dummyToken);
    localStorage.setItem('authUser', JSON.stringify(dummyUser));
    
    setToken(dummyToken);
    setUser(dummyUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
