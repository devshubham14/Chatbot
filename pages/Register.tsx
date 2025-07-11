import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Register: React.FC = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | ''>('');
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (pwd: string) => {
    if (!pwd) return '';
    if (pwd.length < 6) return 'weak';
    // Medium: 6+ chars, at least 1 letter and 1 number
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pwd)) {
      // Strong: 8+ chars, letter, number, special char
      if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pwd)) {
        return 'strong';
      }
      return 'medium';
    }
    return 'weak';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (passwordStrength === 'weak') {
      setError('Password is too weak');
      return;
    }
    const ok = await register(username, password);
    if (ok) {
      navigate('/chat');
    } else {
      setError('Username already exists');
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
      <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 z-10" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-2xl px-8 pt-10 pb-8 flex flex-col gap-4 border border-gray-300 dark:border-gray-700 z-20 backdrop-blur-lg"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="bg-blue-500 dark:bg-blue-400 rounded-full p-3 mb-2 shadow-lg">
            <svg className="w-8 h-8 text-white dark:text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v2m0 4h.01" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Join us! Register a new account.</p>
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
            onChange={handlePasswordChange}
            required
            autoComplete="new-password"
          />
          {/* Password strength meter */}
          {password && (
            <div className="h-2 mt-1 rounded transition-all"
              style={{
                background:
                  passwordStrength === 'strong'
                    ? 'linear-gradient(to right, #34d399, #059669)'
                    : passwordStrength === 'medium'
                    ? 'linear-gradient(to right, #fbbf24, #f59e42)'
                    : 'linear-gradient(to right, #f87171, #dc2626)',
                width:
                  passwordStrength === 'strong'
                    ? '100%'
                    : passwordStrength === 'medium'
                    ? '70%'
                    : '40%',
                opacity: password ? 1 : 0,
              }}
            />
          )}
          {password && (
            <div className={`text-xs mt-1 font-semibold ${
              passwordStrength === 'strong'
                ? 'text-green-600 dark:text-green-400'
                : passwordStrength === 'medium'
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {passwordStrength === 'strong'
                ? 'Strong password'
                : passwordStrength === 'medium'
                ? 'Medium password'
                : 'Weak password'}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            id="confirmPassword"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition mb-1"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button
          className="w-full py-2 mt-2 text-lg font-semibold shadow hover:shadow-lg transition rounded bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:from-green-700 dark:to-blue-700 dark:hover:from-blue-800 dark:hover:to-green-800"
          type="submit"
        >
          Register
        </button>
        <div className="text-center mt-2">
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
