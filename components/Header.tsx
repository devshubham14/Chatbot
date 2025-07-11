import React from 'react';
import { useAuth } from '../utils/auth';

interface HeaderProps {
  onExport: () => void;
  onToggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onExport, onToggleTheme, darkMode }) => {
  const { logout, user } = useAuth();
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow border-b dark:border-gray-700 rounded-t-2xl">
      <div className="font-bold text-lg">Chatbot by Shubham</div>
      <div className="flex items-center gap-2">
        <button
          className="btn btn-sm btn-outline"
          onClick={onExport}
          title="Export chat"
        >
          Export
        </button>
        <button
          className="btn btn-sm btn-outline"
          onClick={onToggleTheme}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">{user?.username}</span>
        <button
          className="btn btn-sm btn-error ml-2"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
