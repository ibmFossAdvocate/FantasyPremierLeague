import React, { useState } from 'react';
import { registerUser, loginUser, draftTeam } from './api';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [gameweek, setGameweek] = useState(1);
  const [players, setPlayers] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await registerUser(email, password);
      alert(response.message);
    } catch (error) {
      alert('Registration failed.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      alert(response.message);
      setUserId(1); // Mock user ID for now
    } catch (error) {
      alert('Login failed.');
    }
  };

  const handleDraft = async () => {
    try {
      const response = await draftTeam(userId, gameweek, players, captain, viceCaptain);
      alert(response.message);
    } catch (error) {
      alert('Drafting team failed.');
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Fantasy Premier League</h1>

      <div>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <div>
        <h2>Draft Team</h2>
        <input
          type="number"
          placeholder="Gameweek"
          value={gameweek}
          onChange={(e) => setGameweek(e.target.value)}
        />
        <textarea
          placeholder="Player IDs (comma-separated)"
          value={players}
          onChange={(e) => setPlayers(e.target.value.split(','))}
        />
        <input
          type="number"
          placeholder="Captain ID"
          value={captain}
          onChange={(e) => setCaptain(e.target.value)}
        />
        <input
          type="number"
          placeholder="Vice-Captain ID"
          value={viceCaptain}
          onChange={(e) => setViceCaptain(e.target.value)}
        />
        <button onClick={handleDraft}>Draft Team</button>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
