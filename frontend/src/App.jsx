import { useState, useEffect } from 'react';
import Login from './components/Login';
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';
import VantaBackground from './components/VantaBackground';
import './App.css';
import { tokenStorage } from './services/api';

function App() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('chat_username') || '';
  });
  const [token, setToken] = useState(() => tokenStorage.get() || '');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (payload) => {
    // payload can be either a username string (legacy) or { username, token }
    if (typeof payload === 'string') {
      setUsername(payload);
      localStorage.setItem('chat_username', payload);
      return;
    }

    const nextUsername = payload?.username || '';
    const nextToken = payload?.token || '';
    setUsername(nextUsername);
    setToken(nextToken);
    localStorage.setItem('chat_username', nextUsername);
    tokenStorage.set(nextToken);
  };

  const handleLogout = () => {
    setUsername('');
    setToken('');
    setSelectedRoom(null);
    localStorage.removeItem('chat_username');
    tokenStorage.clear();
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!username || !token) {
    return (
      <VantaBackground darkMode={darkMode}>
        <Login onLogin={handleLogin} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </VantaBackground>
    );
  }

  return (
    <VantaBackground darkMode={darkMode}>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <div className="app-header">
          <h1>Hive</h1>
          <div className="user-info">
            Logged in as: <strong>{username}</strong>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            <button onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
        <div className="app-content">
          <RoomList onSelectRoom={handleSelectRoom} selectedRoomId={selectedRoom?.id} />
          <ChatRoom room={selectedRoom} username={username} />
        </div>
      </div>
    </VantaBackground>
  );
}

export default App;
