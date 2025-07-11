import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      navigate('/chat');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0 brightness-75">
        <source src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/0 dark:bg-gray-900/10 z-10" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-2xl px-8 pt-10 pb-8 flex flex-col gap-4 border border-gray-300 dark:border-gray-700 z-20 backdrop-blur-lg"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="bg-blue-500 dark:bg-blue-400 rounded-full p-3 mb-2 shadow-lg">
            <svg className="w-8 h-8 text-white dark:text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v2m0 4h.01" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Sign In</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome back! Please login to your account.</p>
        </div>
        {error && <p className="text-red-500 text-center bg-red-100 dark:bg-red-900 rounded py-2 px-3 mb-2 animate-shake">{error}</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            id="username"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition mb-1"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition mb-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          className="w-full py-2 mt-2 text-lg font-semibold shadow hover:shadow-lg transition rounded bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-violet-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:from-indigo-700 dark:to-violet-700 dark:hover:from-violet-800 dark:hover:to-indigo-800"
          type="submit"
        >
          Login
        </button>
        <div className="text-center mt-2">
          <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            No account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
