import { useMemo, useState } from 'react';
import './Login.css';
import { authAPI } from '../services/api';

function Login({ onLogin, darkMode, toggleDarkMode }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => username.trim().length > 0 && password.length > 0 && !loading, [username, password, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername || !password || loading) return;

    setError('');
    setLoading(true);
    try {
      const res =
        mode === 'signup'
          ? await authAPI.signup({ username: cleanUsername, password })
          : await authAPI.login({ username: cleanUsername, password });

      const token = res?.data?.access_token;
      if (!token) throw new Error('Missing access token from server');
      onLogin({ username: cleanUsername, token });
    } catch (err) {
      const serverMessage = err?.response?.data?.message;
      const message = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : serverMessage || err?.message || 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-mode' : ''}`}>
      <button onClick={toggleDarkMode} className="theme-toggle-login">
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="login-card">
        <h1>Welcome to Hive</h1>

        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '0.9rem' }}>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className="login-button"
            style={{ opacity: mode === 'login' ? 1 : 0.65 }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError('');
            }}
            className="login-button"
            style={{ opacity: mode === 'signup' ? 1 : 0.65 }}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          {error ? (
            <div
              style={{
                marginTop: '0.75rem',
                color: 'rgba(255, 255, 255, 0.92)',
                background: 'rgba(255, 80, 80, 0.14)',
                border: '1px solid rgba(255, 80, 80, 0.25)',
                padding: '0.7rem 0.8rem',
                borderRadius: '10px',
                fontFamily: "'Courier New', monospace",
                fontSize: '0.95rem',
                lineHeight: 1.35,
              }}
            >
              {error}
            </div>
          ) : null}

          <button type="submit" className="login-button" disabled={!canSubmit}>
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
