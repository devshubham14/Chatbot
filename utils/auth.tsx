import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface User {
  username: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_DB_KEY = 'zerocode_fake_users';
const TOKEN_KEY = 'zerocode_token';

function fakeHash(pw: string) {
  return btoa(pw.split('').reverse().join(''));
}

function fakeJwt(username: string) {
  return btoa(JSON.stringify({ username, exp: Date.now() + 1000 * 60 * 60 }));
}

function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        if (decoded.exp > Date.now()) {
          setUser({ username: decoded.username, token });
        } else {
          removeToken();
        }
      } catch {
        removeToken();
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    const db = JSON.parse(localStorage.getItem(FAKE_DB_KEY) || '{}');
    if (db[username] && db[username] === fakeHash(password)) {
      const token = fakeJwt(username);
      saveToken(token);
      setUser({ username, token });
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string) => {
    let db = JSON.parse(localStorage.getItem(FAKE_DB_KEY) || '{}');
    if (db[username]) return false;
    db[username] = fakeHash(password);
    localStorage.setItem(FAKE_DB_KEY, JSON.stringify(db));
    const token = fakeJwt(username);
    saveToken(token);
    setUser({ username, token });
    return true;
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
